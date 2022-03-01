import { Head, BlitzLayout } from "blitz";
import { Container, useMantineTheme } from "@mantine/core";
import { ReactChildren } from "react";

export interface MinimalLayoutProps {
    "title"?: string,
    "description"?: string,
    "prefixed"?: boolean,
    "containerize"?: boolean,
    "children": ReactChildren
}

const base = {
    "title": "flags.sh",
    "description": "A simple script generator to start your Minecraft servers with optimal flags."
};

const MinimalLayout: BlitzLayout<MinimalLayoutProps> = ({ title, description, prefixed = true, containerize = true, children }: MinimalLayoutProps) => {
    const width = "100vw";
    const height = "100vh";

    const targetTitle = prefixed && title ? `${base.title} | ${title}` : base.title;
    const targetDescription = description ?? base.description;

    const theme = useMantineTheme();

    return (
        <Container sx={{
            "minWidth": width,
            "maxWidth": width,
            "height": height
        }}>
            <Head>
                <title>{targetTitle}</title>
                <meta property="og:title" content={targetTitle} />
                <meta property="twitter:title" content={targetTitle} />

                <meta property="og:description" content={targetDescription} />
                <meta property="twitter:description" content={targetDescription} />

                <meta name="application-name" content={base.title} />
                <meta property="og:site_name" content={base.title} />
                <meta name="twitter:card" content="summary" />
                <meta property="og:type" content="website" /> {/* https://ogp.me/#types */}

                <meta name="theme-color" content={theme.colors[theme.primaryColor]?.[5]} />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            {
                containerize ? (
                    <Container sx={{
                        "height": "inherit",
                        "overflow": "hidden" // TODO: This is a bad solution
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
