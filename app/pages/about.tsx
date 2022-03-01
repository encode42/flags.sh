import { Center, Paper, Title, Text, useMantineColorScheme, Group, Space, Anchor } from "@mantine/core";
import Layout from "../core/layouts/Layout";
import PageTitle from "../core/components/PageTitle";
import SideBySide from "../core/components/SideBySide";
import FooterRow from "../core/components/actionButtons/FooterRow";
import { HomeLink } from "../core/components/actionButtons/HomeLink";

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
                    <PageTitle />

                    <Space h="md" />

                    <Group direction="column">
                        <Group direction="column" spacing="xs">
                            <Title order={2}>About</Title>
                            <Text>This site generates a start script for your server. It utilizes easy configuration, and support for multiple operating systems.</Text>
                            <Text>Everything on this website is W.I.P. and subject to change!</Text>
                        </Group>
                        <Group direction="column" spacing="xs">
                            <Title order={2}>Support</Title>
                            <Text>You can join the <Anchor href="https://encode42.dev/support">Discord server</Anchor> if you're running into issues.</Text>
                        </Group>
                        <Group direction="column" spacing="xs">
                            <Title order={2}>Contribute</Title>
                            <Text>If you have found an issue or have a feature request, head to the <Anchor href="https://github.com/Encode42/flags.sh">GitHub</Anchor> repository.</Text>
                        </Group>
                    </Group>

                    <Space h="md" />

                    <SideBySide leftSide={
                        <HomeLink filled />
                    } rightSide={
                        <FooterRow />
                    } />
                </Paper>
            </Center>
        </>
    );
}

About.getLayout = page => <Layout>{page}</Layout>;

export default About;
