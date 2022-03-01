import { saveText } from "../util/util";
import { useEffect, useState } from "react";
import { Center, Group, Paper, Space, Text, TextInput, Switch, Code, ActionIcon, useMantineColorScheme, Select } from "@mantine/core";
import { AlertCircle, Archive, BrandDebian, BrandWindows, Download, Terminal } from "tabler-icons-react";
import { Prism } from "@mantine/prism";
import Layout from "../core/layouts/Layout";
import PageTitle from "../core/components/PageTitle";
import MarkedSlider from "../core/components/MarkedSlider";
import FooterRow from "../core/components/actionButtons/FooterRow";
import SideBySide from "../core/components/SideBySide";
import { Flags } from "../data/Flags";
import { Environments } from "../data/Environments";
import { EnvironmentType } from "../data/interface/EnvironmentsInterface";

// TODO: API
// TODO: Inconsistent states (filename is preserved through refresh, but not toggles)
// TODO: Share button
// TODO: Use data objects to generate tabs and flags select dynamically

/**
 * The homepage of the site.
 */
function Home() {
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";

    const defaultFilename = "server.jar";
    const [filename, setFileName] = useState<string>(defaultFilename);
    const [memory, setMemory] = useState<number>(4);
    const [selectedFlags, setSelectedFlags] = useState<string>("aikars");

    const [toggles, setToggles] = useState({
        "gui": false,
        "autoRestart": false,
        "pterodactyl": false,
        "modernJava": true
    });

    const [result, setResult] = useState<string>("Loading...");

    const [environment, setEnvironment] = useState<EnvironmentType>(Environments.default);
    const [invalidFilename, setInvalidFilename] = useState<boolean | string>(false);

    // An option has been changed
    useEffect(() => {
        // Get the applicable flags
        const flag = Flags.types[selectedFlags];
        if (!flag) {
            return;
        }

        // Get the target memory
        let targetMem = memory;
        if (!environment.disabled.pterodactyl && toggles.pterodactyl) {
            targetMem = (85 / 100) * targetMem;
        }

        // Create the script
        const flags = flag.result({
            "memory": targetMem,
            "filename": filename.replaceAll(/\s/g, "\\ "),
            "gui": !environment.disabled.gui && toggles.gui,
            "modernJava": !environment.disabled.gui && toggles.modernJava
        });
        const script = environment.result({ flags, "autoRestart": toggles.autoRestart });

        setResult(script);
    }, [filename, memory, selectedFlags, toggles, environment]);

    // The environment's toggles have changed
    useEffect(() => {
        if (!environment.requires) {
            return;
        }

        // Iterate each requirement
        for (const [key, value] of Object.entries(environment.requires)) {
            if (value.excludes) {
                // Disable toggles if required
                for (const exclude of value.excludes) {
                    environment.disabled[key] = !!toggles[exclude];
                }
            }
        }
    }, [toggles, environment.requires, environment.disabled]);

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
                            <TextInput label="Filename" defaultValue={defaultFilename} icon={<Archive />} error={invalidFilename} onChange={event => {
                                const value = event.target.value;

                                if (!value.includes(".jar")) {
                                    setInvalidFilename("Filename must end with .jar");
                                } else {
                                    setInvalidFilename(false);
                                    setFileName(event.target.value);
                                }
                            }}/>

                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                            <label>
                                <Text size={"sm"}>Memory</Text>
                                <MarkedSlider interval={4} step={0.5} min={0.5} max={24} defaultValue={memory} thumbLabel="Memory allocation slider" label={value => {
                                    return `${value.toFixed(1)} GB`;
                                }} onChange={value => {
                                    setMemory(value);
                                }}/>
                            </label>
                        </Group>
                        <Group direction="column" grow>
                            <Select value={selectedFlags} label="Flags" onChange={value => {
                                setSelectedFlags(value ?? selectedFlags);
                            }} data={[{
                                "value": "none",
                                "label": "None"
                            }, {
                                "value": "aikars",
                                "label": "Aikar's Flags"
                            }]} />
                            <Switch label="GUI" checked={!environment.disabled.gui && toggles.gui} disabled={environment.disabled.gui} onChange={event => {
                                setToggles({ ...toggles, "gui": event.target.checked });
                            }} />
                            <Switch label="Auto-restart" checked={!environment.disabled.autoRestart && toggles.autoRestart} disabled={environment.disabled.autoRestart} onChange={event => {
                                setToggles({ ...toggles, "autoRestart": event.target.checked });
                            }} />
                            <Switch label="Pterodactyl" checked={!environment.disabled.pterodactyl && toggles.pterodactyl} disabled={environment.disabled.pterodactyl} onChange={event => {
                                setToggles({ ...toggles, "pterodactyl": event.target.checked });
                            }} />
                            <Switch label="Java 17" checked={!environment.disabled.modernJava && toggles.modernJava} disabled={environment.disabled.modernJava} onChange={event => {
                                setToggles({ ...toggles, "modernJava": event.target.checked });
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
                        // Get the selected type from the tab
                        const key = Object.keys(Environments.types)[active]; // TODO: This is unreliable, but tabKey does not work
                        if (!key) {
                            return;
                        }

                        // Toggle the non-applicable components
                        const env = Environments.types[key];
                        if (!env) {
                            return;
                        }

                        setEnvironment(env);
                    }}>
                        <Prism.Tab key="linux" label="Linux / Mac" withLineNumbers scrollAreaComponent="div" language="bash" icon={<BrandDebian />}>
                            {result}
                        </Prism.Tab>
                        <Prism.Tab key="windows" label="Windows" withLineNumbers scrollAreaComponent="div" language="bash" icon={<BrandWindows />}>
                            {result}
                        </Prism.Tab>
                        <Prism.Tab key="java" label="Java Command" withLineNumbers scrollAreaComponent="div" language="bash" icon={<Terminal />}>
                            {result}
                        </Prism.Tab>
                    </Prism.Tabs>

                    <Space h="md" />

                    <SideBySide leftSide={
                        <Group noWrap>
                            <ActionIcon color="green" variant="filled" size="lg" title="Download current script" disabled={environment.disabled.download} onClick={() => {
                                if (environment.file) {
                                    saveText(result, environment.file);
                                }
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
