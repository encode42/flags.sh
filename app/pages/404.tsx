import { Head, Link, Routes } from "blitz";
import { Center, Group, Title, Text, Anchor } from "@mantine/core";

/**
 * The standard 404 page for Blitz.js and Mantine UI.
 */
export default function Page404() {
    const statusCode = 404;
    const title = "This page could not be found";
    return (
        <>
            <Head>
                <title>
                    {statusCode}: {title}
                </title>
            </Head>
            <Center sx={{
                "height": "100vh"
            }}>
                <Group direction="column" sx={{
                    "alignItems": "center"
                }}>
                    <Group>
                        <Title>{statusCode}</Title>
                        <Text>{title}</Text>
                    </Group>
                    <Link href={Routes.Home()} passHref>
                        <Anchor>Back Home</Anchor>
                    </Link>
                </Group>
            </Center>
        </>
    );
}
