import { ReactChildren } from "react";
import { Head } from "blitz";
import { Container, useMantineTheme } from "@mantine/core";
import { siteDetails } from "../../util/util";

/**
 * The properties for this layout.
 */
export interface MinimalLayoutProps {
    /**
     * Title of the page.
     *
     * Defaults to the site's name.
     */
    "title"?: string,

    /**
     * Description of the page.
     *
     * Defaults to the site's description.
     */
    "description"?: string,

    /**
     * Whether the page's title should be prefixed with the site's name.
     */
    "prefixed"?: boolean,

    /**
     * Whether the layout should be containerized.
     */
    "containerize"?: boolean,

    /**
     * The children of this layout.
     */
    "children": ReactChildren
}

export default function MinimalLayout({ title, description, prefixed = true, containerize = true, children }: MinimalLayoutProps) {
    const width = "100vw";
    const height = "100vh";

    // Process the title and description
    const targetTitle = prefixed && title ? `${siteDetails.title} | ${title}` : siteDetails.title;
    const targetDescription = description ?? siteDetails.description;

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

                <meta name="description" content={targetDescription} />
                <meta property="og:description" content={targetDescription} />
                <meta property="twitter:description" content={targetDescription} />

                <meta name="application-name" content={siteDetails.title} />
                <meta property="og:site_name" content={siteDetails.title} />
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
}
