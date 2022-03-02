import { saveText } from "../util/util";
import { useEffect, useState } from "react";
import { Center, Group, Paper, Space, Text, TextInput, Switch, Code, ActionIcon, useMantineColorScheme, Select } from "@mantine/core";
import { AlertCircle, Archive, BrandDebian, BrandWindows, Download, Terminal, Tool } from "tabler-icons-react";
import { Prism } from "@mantine/prism";
import Layout from "../core/layout/Layout";
import PageTitle from "../core/components/PageTitle";
import MarkedSlider from "../core/components/MarkedSlider";
import FooterRow from "../core/components/actionButton/FooterRow";
import SideBySide from "../core/components/SideBySide";
import { Flags } from "../data/Flags";
import { Environments } from "../data/Environments";
import { EnvironmentType } from "../data/interface/EnvironmentsInterface";
import { FlagType } from "../data/interface/FlagsInterface";
import MemoryModal from "../core/components/modal/MemoryModal";
import FlagModal from "../core/components/modal/FlagModal";
import IconInput from "../core/components/inputLabel/IconLabel";
import TextLabel from "../core/components/inputLabel/TextLabel";

// TODO: API
// TODO: Inconsistent states (filename is preserved through refresh, but not toggles)
// TODO: Share button
// TODO: Use data objects to generate tabs and flags select dynamically

// TODO: "temporary" to-be-applied states - This can be done by separating the modals into different components and requiring an "on apply" functiton
// TODO: Modal popup buttons that store the opened state in it

// TODO: Separate captioned inputs into component

/**
 * Data for a flag in the selector.
 */
interface FlagSelector {
    /**
     * Key of the entry.
     */
    "value": string,

    /**
     * Label of the entry.
     */
    "label": string
};

/**
 * The homepage of the site.
 */
function Home() {
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";

    const defaultFilename = "server.jar";
    const [filename, setFileName] = useState<string>(defaultFilename);
    const [memory, setMemory] = useState<number>(4);

    const [toggles, setToggles] = useState({
        "gui": false,
        "autoRestart": false,
        "pterodactyl": false,
        "modernJava": true
    });

    const [result, setResult] = useState<string>("Loading...");

    const [flagSelector, setFlagSelector] = useState<FlagSelector[]>([]);
    const [selectedFlags, setSelectedFlags] = useState<FlagType>(Flags.default);
    const [environment, setEnvironment] = useState<EnvironmentType>(Environments.default);
    const [invalidFilename, setInvalidFilename] = useState<boolean | string>(false);

    const [openMemoryModal, setOpenMemoryModal] = useState(false);
    const [openFlagModal, setOpenFlagModal] = useState(false);

    // Generate the flags selector
    useEffect(() => {
        const flags: FlagSelector[] = [];

        for (const value of Object.values(Flags.types)) {
            flags.push({
                "value": value.key,
                "label": value.label
            });
        }

        setFlagSelector(flags);
    }, [flagSelector]);

    // An option has been changed
    useEffect(() => {
        // Get the target memory
        let targetMem = memory;
        if (!environment.disabled.pterodactyl && toggles.pterodactyl) {
            targetMem = (85 / 100) * targetMem;
        }

        // Create the script
        const flags = selectedFlags.result({
            "memory": targetMem,
            "filename": filename.replaceAll(/\s/g, "\\ "),
            "gui": !environment.disabled.gui && toggles.gui,
            "modernJava": !environment.disabled.modernJava && toggles.modernJava
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
            const newDisabled = environment.disabled;

            if (value.excludes) {
                // Disable toggles if required
                for (const exclude of value.excludes) {
                    newDisabled[key] = !!toggles[exclude];
                }
            }

            setEnvironment({
                ...environment,
                "disabled": newDisabled
            });
        }
    }, [toggles, environment.requires, environment.disabled]);

    return (
        <>
            {/* The control center */}
            <Center sx={{
                "height": "100%"
            }}>
                <Paper padding="md" shadow="sm" withBorder sx={theme => ({
                    "width": "100%",
                    "backgroundColor": isDark ? theme.colors.dark[6] : theme.colors.gray[0]
                })}>
                    <PageTitle />
                    <Group grow>
                        {/* Left options */}
                        <Group direction="column" grow>
                            {/* Filename selector */}
                            <TextLabel label="Filename">
                                <TextInput defaultValue={defaultFilename} error={invalidFilename} icon={<Archive />} onChange={event => {
                                    const value = event.target.value;

                                    // Ensure the input is valid
                                    if (!value.includes(".jar")) {
                                        setInvalidFilename("Filename must end with .jar");
                                    } else {
                                        setInvalidFilename(false);
                                        setFileName(event.target.value);
                                    }
                                }}/>
                            </TextLabel>

                            {/* Memory selector */}
                            <IconInput label="Memory" icon={
                                <ActionIcon size="xs" variant="transparent" onClick={() => {
                                    setOpenMemoryModal(true);
                                }}>
                                    <Tool />
                                </ActionIcon>
                            }>
                                <MarkedSlider interval={4} step={0.5} min={0.5} max={24} value={memory} thumbLabel="Memory allocation slider" label={() => {
                                    return `${memory.toFixed(1)} GB`;
                                }} onChange={value => {
                                    setMemory(value);
                                }}/>
                            </IconInput>
                        </Group>

                        {/* Right options */}
                        <Group direction="column" grow>
                            {/* Flags selector */}
                            <IconInput label="Flags" icon={
                                <ActionIcon size="xs" variant="transparent" onClick={() => {
                                    setOpenFlagModal(true);
                                }}>
                                    <Tool />
                                </ActionIcon>
                            }>
                                <Select value={selectedFlags.key} onChange={value => {
                                    if (!value) {
                                        return;
                                    }

                                    setSelectedFlags(Flags.types[value] ?? selectedFlags);
                                }} data={flagSelector} />
                            </IconInput>

                            {/* Misc toggles */}
                            <Switch label="GUI" checked={!environment.disabled.gui && toggles.gui} disabled={environment.disabled.gui} onChange={event => {
                                setToggles({ ...toggles, "gui": event.target.checked });
                            }} />
                            <Switch label="Auto-restart" checked={!environment.disabled.autoRestart && toggles.autoRestart} disabled={environment.disabled.autoRestart} onChange={event => {
                                setToggles({ ...toggles, "autoRestart": event.target.checked });
                            }} />
                        </Group>
                    </Group>

                    <Space h="md" />

                    {/* Resulting flags */}
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

                    {/* Footer links */}
                    <SideBySide leftSide={
                        <Group noWrap>
                            {/* Download button */}
                            <ActionIcon color="green" variant="filled" size="lg" title="Download current script" disabled={environment.disabled.download} onClick={() => {
                                if (environment.file) {
                                    saveText(result, environment.file);
                                }
                            }}>
                                <Download />
                            </ActionIcon>

                            {/* Low memory alert */}
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
                        /* Misc links */
                        <FooterRow />
                    } />
                </Paper>
            </Center>

            {/* Modals */}
            <MemoryModal open={{
                "value": openMemoryModal,
                "set": setOpenMemoryModal
            }} memory={{
                "value": memory,
                "set": setMemory
            }} pterodactyl={{
                "value": !environment.disabled.pterodactyl && toggles.pterodactyl,
                "set": value => {
                    setToggles({ ...toggles, "pterodactyl": value });
                },
                "disabled": environment.disabled.pterodactyl ?? false
            }} />

            <FlagModal open={{
                "value": openFlagModal,
                "set": setOpenFlagModal
            }} modernJava={{
                "value": !environment.disabled.modernJava && toggles.modernJava,
                "set": value => {
                    setToggles({ ...toggles, "modernJava": value });
                },
                "disabled": environment.disabled.modernJava ?? false
            }} />
        </>
    );
}

Home.getLayout = page => <Layout>{page}</Layout>;

export default Home;
