import { Head, BlitzLayout } from "blitz";
import { Box, Container } from "@mantine/core";

export interface MinimalLayoutProps {
    "title"?: string,
    "containerize"?: boolean,
    "children": any
}

const MinimalLayout: BlitzLayout<MinimalLayoutProps> = ({ title, containerize = true, children }: MinimalLayoutProps) => {
    const width = "100vw";
    const height = "100vh";

    return (
        <Container sx={{
            "minWidth": width,
            "maxWidth": width,
            "height": height
        }}>
            <Head>
                <title>{title || "LaunchMC"}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {
                containerize ? (
                    <Container sx={{
                        "height": "100%"
                    }}>
                        {children}
                    </Container>
                ) : (
                    children
                )
            }
        </Container>
    );
};

export default MinimalLayout;
