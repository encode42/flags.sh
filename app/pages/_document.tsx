import { Document, Html, DocumentHead, Main, BlitzScript } from "blitz";
import { createGetInitialProps } from "@mantine/next";

const getInitialProps = createGetInitialProps();

export default class MyDocument extends Document {
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
