import { ReactElement } from "react";
import { Head, Link, Routes, useRouter } from "blitz";
import { Center, Group, Title, Text, Anchor } from "@mantine/core";

/**
 * The standard 404 page for Blitz.js and Mantine UI.
 */
export default function Page404(): ReactElement {
    const statusCode = 404;
    const title = "This page could not be found";

    const router = useRouter();

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
                    <Group>
                        <Anchor onClick={() => {
                            router.back();
                        }}>
                            Back
                        </Anchor>
                        <Link href={Routes.Home()} passHref>
                            <Anchor>Home</Anchor>
                        </Link>
                    </Group>
                </Group>
            </Center>
        </>
    );
}
