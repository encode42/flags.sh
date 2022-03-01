import { Document, Html, DocumentHead, Main, BlitzScript } from "blitz";
import { createGetInitialProps } from "@mantine/next";

const getInitialProps = createGetInitialProps();

/**
 * The standard document template for Blitz.js and Mantine UI.
 */
export default class BlitzDocument extends Document {
    static getInitialProps = getInitialProps;

    render() {
        return (
            <Html lang="en">
                <DocumentHead />
                <body>
                    <Main />
                    <BlitzScript />
                </body>
            </Html>
        );
    }
}
