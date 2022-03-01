import { saveText } from "../util/util";
import { stripIndent } from "common-tags";
import { useEffect, useState } from "react";
import { Center, Group, Paper, Space, Text, TextInput, Switch, Code, ActionIcon, useMantineColorScheme, Select } from "@mantine/core";
import { AlertCircle, Archive, BrandDebian, BrandWindows, Download } from "tabler-icons-react";
import { Prism } from "@mantine/prism";
import Layout from "../core/layouts/Layout";
import PageTitle from "../core/components/PageTitle";
import MarkedSlider from "../core/components/MarkedSlider";
import FooterRow from "../core/components/actionButtons/FooterRow";
import SideBySide from "../core/components/SideBySide";

// TODO: API

// TODO: Use this to generate tabs dynamically
// TODO: Use functional objects for this as well
const allEnvs = {
    "linux": {
        "file": "start.sh",
        "header": stripIndent`
            #!/bin/bash
        `,
        get "standard"() {
            return stripIndent`
                ${this.header}
                
                %flags
            `;
        },
        get "autorestart"() {
            return stripIndent`
                ${this.header}
                while [ true ]; do
                    %flags
                
                    echo Server restarting...
                    echo Press CTRL + C to stop.
                done
            `;
        }
    },
    "windows": {
        "file": "start.bat",
        "standard": stripIndent`
            %flags
            
            pause
        `,
        get "autorestart"() {
            return stripIndent`
                :start
                %flags
                
                echo Server restarting...
                echo Press CTRL + C to stop.
                goto :start
            `;
        }
    }
};

const flags = {
    "types": {
        "none": {
            "result": ({ memory, filename, gui, modernJava }) => {
                return `${flags.prefix({ memory, modernJava })} ${flags.suffix({ filename, gui })}`;
            }
        },
        "aikars": {
            "result": ({ memory, filename, gui, modernJava }) => {
                const base = `${flags.types.aikars.base} ${memory >= 12 ? flags.types.aikars[">12G"] : flags.types.aikars["<12G"]}`;
                return `${flags.prefix({ memory, modernJava })} ${base} ${flags.suffix({ filename, gui })}`;
            },
            "base": "-XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true",
            "<12G": "-XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20",
            ">12G": "-XX:G1NewSizePercent=40 -XX:G1MaxNewSizePercent=50 -XX:G1HeapRegionSize=16M -XX:G1ReservePercent=15"
        }
    },
    "prefix": ({ memory, modernJava }) => {
        const targetMem = memory * 1024;
        const displayMemory = `${targetMem?.toFixed(0)}M`;
        return `java -Xms${displayMemory} -Xmx${displayMemory} ${modernJava ? "--add-modules=jdk.incubator.vector" : ""}`.trim();
    },
    "suffix": ({ filename, gui }) => {
        return `-jar ${filename} ${!gui ? "--nogui" : ""}`.trim();
    }
}

interface Placeholders {
    /**
     * Key is the placeholder to replace (without "%"), value is the replacement.
     */
    [key: string]: string
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
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";

    const defaultFilename = "server.jar";
    const maxMemory = 24;
    const [filename, setFileName] = useState<string>(defaultFilename);
    const [invalidFilename, setInvalidFilename] = useState<boolean | string>(false);
    const [selectedFlags, setSelectedFlags] = useState<string>("aikars");
    const [memory, setMemory] = useState<number>(4);

    const [gui, setGUI] = useState(false);
    const [autorestart, setAutorestart] = useState(false);
    const [modernJava, setModernJava] = useState(false);
    const [pterodactyl, setPterodactyl] = useState(false);

    const [activeTab, setActiveTab] = useState<string>("linux");
    const [result, setResult] = useState<string>("Empty");

    // Option has been changed
    useEffect(() => {
        // Get the applicable flags
        const targetFlags = flags.types[selectedFlags];

        if (!targetFlags) {
            return;
        }

        // Get the target memory
        let targetMem = memory;
        if (pterodactyl) {
            targetMem = (85 / 100) * targetMem;
        }

        const script = allEnvs[activeTab];

        // Replace the placeholders
        setResult(process(autorestart ? script.autorestart : script.standard, {
            "flags": targetFlags.result({ "memory": targetMem, filename, gui, modernJava })
        }));
    }, [filename, memory, selectedFlags, gui, autorestart, modernJava, pterodactyl, activeTab]);

    return (
        <>
            <Center sx={{
                "height": "100%"
            }}>
                <Paper padding="md" shadow="sm" withBorder sx={theme => ({
                    "width": "100%",
                    "backgroundColor": isDark ? theme.colors.dark[6] : theme.colors.gray[0]
                })}>
                    <PageTitle />
                    <Group grow>
                        <Group direction="column" grow>
                            {/* TODO: Reset value on refresh */}
                            <TextInput label="Filename" defaultValue={defaultFilename} icon={<Archive />} error={invalidFilename} onChange={event => {
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
                                <MarkedSlider interval={4} step={0.5} min={0.5} max={maxMemory} defaultValue={memory} thumbLabel="Memory allocation slider" label={value => {
                                    return `${value.toFixed(1)} GB`;
                                }} onChange={value => {
                                    setMemory(value);
                                }}/>
                            </label>
                        </Group>
                        <Group direction="column" grow>
                            <Select value={selectedFlags} onChange={value => {
                                setSelectedFlags(value ?? selectedFlags);
                            }} data={[{
                                "value": "none",
                                "label": "None"
                            }, {
                                "value": "aikars",
                                "label": "Aikar's Flags"
                            }]} />
                            <Switch label="GUI" checked={gui} onChange={event => {
                                setGUI(event.target.checked);
                            }} />
                            <Switch label="Autorestart" checked={autorestart} onChange={event => {
                                setAutorestart(event.target.checked);
                            }} />
                            <Switch label="Java 17+" checked={modernJava} onChange={event => {
                                setModernJava(event.target.checked);
                            }} />
                            <Switch label="Pterodactyl" checked={pterodactyl} onChange={event => {
                                setPterodactyl(event.target.checked);
                            }} />
                        </Group>
                    </Group>

                    <Space h="lg" />
                    <Text size="xl" weight={700}>Result</Text>
                    <Prism.Tabs styles={theme => ({
                        "copy": {
                            "backgroundColor": isDark ? theme.colors.dark[6] : theme.colors.gray[0],
                            "borderRadius": theme.radius.xs
                        },
                        "line": {
                            "whiteSpace": "pre-wrap"
                        }
                    })} onTabChange={active => {
                        // Get the tabbed script
                        const currentKey = Object.keys(allEnvs)[active];
                        if (!currentKey) {
                            return;
                        }

                        setActiveTab(currentKey);
                    }}>
                        <Prism.Tab key="linux" label="Linux / Mac" withLineNumbers scrollAreaComponent="div" language="bash" icon={<BrandDebian />}>
                            {result}
                        </Prism.Tab>
                        <Prism.Tab key="windows" label="Windows" withLineNumbers scrollAreaComponent="div" language="bash" icon={<BrandWindows />}>
                            {result}
                        </Prism.Tab>
                    </Prism.Tabs>

                    <Space h="md" />

                    <SideBySide leftSide={
                        <Group noWrap>
                            <ActionIcon color="green" variant="filled" size="lg" title="Download current script" onClick={() => {
                                saveText(result, allEnvs[activeTab].file);
                            }}>
                                <Download />
                            </ActionIcon>

                            <Group spacing="xs" noWrap sx={{
                                "display": memory < 4 ? "" : "none"
                            }}>
                                <AlertCircle />
                                <Text sx={{
                                    "whiteSpace": "pre-wrap"
                                }}>It is recommended to allocate at least <Code>4 GB</Code> of memory.</Text>
                            </Group>
                        </Group>
                    } rightSide={
                        <FooterRow />
                    } />
                </Paper>
            </Center>
        </>
    );
}

Home.getLayout = page => <Layout>{page}</Layout>;

export default Home;
