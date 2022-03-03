import { siteDetails } from "../util/util";
import { Center, Paper, Title, Text, useMantineColorScheme, Group, Anchor, List, Code } from "@mantine/core";
import Layout from "../core/layout/Layout";
import PageTitle from "../core/components/PageTitle";
import SideBySide from "../core/components/SideBySide";
import FooterRow from "../core/components/actionButton/FooterRow";
import { HomeLink } from "../core/components/actionButton/HomeLink";
import { Link, Routes } from "blitz";
import Caption from "../core/components/caption/Caption";

/**
 * The about page of the site.
 */
function About() {
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <>
            <Center sx={{
                "height": "100%"
            }}>
                <Paper padding="md" shadow="sm" withBorder sx={theme => ({
                    "width": "100%",
                    "backgroundColor": isDark ? theme.colors.dark[6] : theme.colors.gray[0]
                })}>
                    <Group direction="column" grow>
                        <PageTitle />

                        <Group direction="column">
                            <Group direction="column" spacing="xs">
                                <Title order={2}>About</Title>
                                <Text>{siteDetails.title} generates a start script for your Minecraft Java Edition server.</Text>
                                <Text>It features stupid simple configuration, many flag types for optimization, and pre-made scripts!</Text>
                            </Group>
                            <Group direction="column" spacing="xs">
                                <Title order={2}>Support</Title>
                                <Text>Here's how to use this site:</Text>
                                <Text>
                                    From the <Link href={Routes.Home()} passHref><Anchor>homepage</Anchor></Link>, enter the name of your server jar.
                                    This jar would be located in your Minecraft server's root directory, where all the config files are located.
                                    If you haven't downloaded a server jar yet, check out <Anchor href="https://papermc.io" target="_blank">Paper</Anchor> or <Anchor href="https://purpurmc.org" target="_blank">Purpur</Anchor>!
                                </Text>
                                <Text>
                                    Enter the amount of memory to allocate to the server with the slider. Ensure this is at least <Code>2 GB</Code> less than your available memory to give your operating system and other applications room to breathe.
                                    For example, if your machine has <Code>8 GB</Code> of memory, give the server at most <Code>6 GB</Code>.
                                </Text>
                                <Text>
                                    Customize the scripts to your liking. You can toggle the server's GUI, change the flags to use, and more. The default settings should be fine for most use cases.
                                </Text>
                                <Text>
                                    Finally, put the generated script into action! You can either copy the script from the results window, or hit the download button to get a ready script.
                                </Text>
                                <Text>You can join the <Anchor href={siteDetails.links.support}>Discord server</Anchor> if you're still running into issues.</Text>
                            </Group>
                            <Group direction="column" spacing="xs">
                                <Title order={2}>Contribute</Title>
                                <Text>Want to add a new set of flags? Found a typo? head to the <Anchor href={siteDetails.links.github}>GitHub</Anchor> repository!</Text>
                                <Text>All contributions are very welcome.</Text>
                            </Group>
                        </Group>

                        <SideBySide leftSide={
                            <HomeLink filled />
                        } rightSide={
                            <FooterRow />
                        } />
                    </Group>
                </Paper>
            </Center>
        </>
    );
}

About.getLayout = page => <Layout title="About">{page}</Layout>;

export default About;
