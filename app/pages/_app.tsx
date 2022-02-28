import { AppProps, ErrorBoundary, ErrorComponent, AuthorizationError, ErrorFallbackProps, useQueryErrorResetBoundary } from "blitz";
import { MantineProvider, useMantineTheme } from "@mantine/core";
import "./_app.scss";
import ColorScheme from "../util/ColorScheme";

export default function App({ Component, pageProps }: AppProps) {
    // Create the color scheme
    const colorScheme = new ColorScheme(useMantineTheme(), "green");
    const defaultColor = colorScheme.getDefault();

    const getLayout = Component.getLayout || (page => page);

    return (
        <ErrorBoundary FallbackComponent={RootErrorFallback} onReset={useQueryErrorResetBoundary().reset}>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={{
                "colorScheme": "dark",
                "colors": {
                    "brand": defaultColor.colors
                },
                "primaryColor": defaultColor.name
            }}>
                {getLayout(<Component {...pageProps} />)}
            </MantineProvider>
        </ErrorBoundary>
    );
}

function RootErrorFallback({ error }: ErrorFallbackProps) {
    return error instanceof AuthorizationError ? (
        <ErrorComponent statusCode={error.statusCode} title="Sorry, you are not authorized to access this"/>
    ) : (
        <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    );
}
