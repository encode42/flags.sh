import Layout from "../core/layouts/Layout";
import { Center, Group, Paper, Slider, Space, Text, TextInput, Switch, Title, Popover, Code } from "@mantine/core";
import { useEffect, useLayoutEffect, useState } from "react";
import { Prism } from "@mantine/prism";
import { stripIndent } from "common-tags";
import { AlertCircle, Archive, BrandDebian, BrandWindows } from "tabler-icons-react";

// TODO: API

// TODO: Make this less repetitive
const allFlags = {
    "aikars": "java -Xms=%mem -Xmx=%mem -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -jar %filename",
    "aikars12G": "java -Xms=%mem -Xmx=%mem -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=40 -XX:G1MaxNewSizePercent=50 -XX:G1HeapRegionSize=16M -XX:G1ReservePercent=15 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=20 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -jar %filename"
};

// TODO: Use this to generate tabs dynamically
const allEnvs = {
    "linux": {
        "header": stripIndent`
            #!/bin/bash
        `,
        get "standard"() {
            return stripIndent`
                ${this.header}
                
                %flags %gui
            `;
        },
        get "autorestart"() {
            return stripIndent`
                ${this.header}
                while [ true ]; do
                    %flags %gui
                
                    echo "Server restarting..."
                done
            `;
        }
    },
    "windows": {
        "standard": stripIndent`
            %flags %gui
        `,
        get "autorestart"() {
            return stripIndent`
                :start
                ${this.standard}
                
                echo "Server restarting..."
                goto :start
            `;
        }
    }
};

interface Placeholders {
    /**
     * Key is the placeholder to replace (without "%"), value is the replacement.
     */
    [key: string]: string
}

interface SliderMarker {
    "value": number,
    "label": string
}

/**
 * Process placeholders for a string.
 *
 * Placeholders are prefixed with "%"
 */
function process(input: string, placeholders: Placeholders): string {
    let result = input;

    for (const [key, value] of Object.entries(placeholders)) {
        result = result.replaceAll(`%${key}`, value);
    }

    return result;
}

/**
 * The homepage of the site.
 */
function Home() {
    const defaultFilename = "server.jar";
    const maxMemory = 24;
    const [filename, setFileName] = useState<string>(defaultFilename);
    const [invalidFilename, setInvalidFilename] = useState<boolean | string>(false);
    const [memory, setMemory] = useState<number>(4);

    const [gui, setGUI] = useState(false);
    const [autorestart, setAutorestart] = useState(false);
    const [pterodactyl, setPterodactyl] = useState(false);

    const [alertOpened, setAlertOpened] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [result, setResult] = useState<string>("Empty");

    const [sliderMarks, setSliderMarks] = useState<SliderMarker[]>([]);
    useLayoutEffect(() => {
        const newSliderMarks: SliderMarker[] = [];

        for (let i = 1; i < maxMemory; i++) {
            if (i % 4 === 0) {
                newSliderMarks.push({
                    "value": i,
                    "label": `${i} GB`
                });
            }
        }

        setSliderMarks(newSliderMarks);
    }, []);


    useEffect(() => {
        let flags = allFlags.aikars;
        if (memory >= 12) {
            flags = allFlags.aikars12G;
        }

        let targetMem = memory;
        if (pterodactyl) {
            targetMem = (85 / 100) * targetMem;
        }

        const memResult = `${targetMem?.toFixed(1)}G`;

        const currentKey = Object.keys(allEnvs)[activeTab];
        if (!currentKey) {
            return;
        }

        const script = allEnvs[currentKey];

        setResult(process(autorestart ? script.autorestart : script.standard, {
            "flags": flags,
            "mem": memResult,
            "filename": filename,
            "gui": gui ? "" : "--nogui"
        }));
    }, [filename, memory, gui, autorestart, pterodactyl, activeTab]);

    return (
        <>
            <Center sx={{
                "height": "100%"
            }}>
                <Paper padding="md" shadow="sm" withBorder sx={theme => ({
                    "width": "100%",
                    "backgroundColor": theme.colors.dark[6]
                })}>
                    <Title>LaunchMC</Title>
                    <Group grow>
                        <Group direction="column" grow>
                            {/* TODO: Reset value on refresh */}
                            <TextInput required label="Filename" defaultValue={defaultFilename} icon={<Archive />} error={invalidFilename} onChange={event => {
                                const value = event.target.value;

                                if (!value.includes(".jar")) {
                                    setInvalidFilename("Filename must end with .jar");
                                } else {
                                    setInvalidFilename(false);
                                    setFileName(event.target.value);
                                }
                            }}/>

                            <label>
                                <Text size={"sm"}>Memory</Text>
                                <Slider step={0.5} min={0.5} max={maxMemory} defaultValue={memory} marks={sliderMarks} label={value => {
                                    return `${value.toFixed(1)} GB`;
                                }} onChange={value => {
                                    setMemory(value);
                                }}/>
                            </label>
                        </Group>
                        <Group direction="column" grow>
                            <Switch label="GUI" checked={gui} onChange={event => {
                                setGUI(event.target.checked);
                            }} />
                            <Switch label="Autorestart" checked={autorestart} onChange={event => {
                                setAutorestart(event.target.checked);
                            }} />
                            <Switch label="Pterodactyl" checked={pterodactyl} onChange={event => {
                                setPterodactyl(event.target.checked);
                            }} />
                        </Group>
                    </Group>

                    <Space h="lg" />
                    <Text size="xl" weight={700}>Result</Text>
                    <Prism.Tabs onTabChange={active => {
                        setActiveTab(active);
                    }}>
                        <Prism.Tab key="linux" label="Linux / Mac" language="bash" icon={<BrandDebian />}>
                            {result}
                        </Prism.Tab>
                        <Prism.Tab key="windows" label="Windows" language="bash" icon={<BrandWindows />}>
                            {result}
                        </Prism.Tab>
                    </Prism.Tabs>
                    <Group direction="column" sx={{
                        "display": memory < 4 ? "" : "none"
                    }}>
                        <Space />
                        <Group>
                            <AlertCircle />
                            <Text>Recommended to allocate at least <Code>4GB</Code> of memory.</Text>
                        </Group>
                    </Group>
                </Paper>
            </Center>
        </>
    );
}

Home.getLayout = page => <Layout>{page}</Layout>;

export default Home;
