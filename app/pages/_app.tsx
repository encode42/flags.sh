import { AppProps, ErrorBoundary, ErrorComponent, AuthorizationError, ErrorFallbackProps, useQueryErrorResetBoundary } from "blitz";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useColorScheme, useLocalStorageValue } from "@mantine/hooks";

export default function App({ Component, pageProps }: AppProps) {
    const preferredColorScheme = useColorScheme();
    const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
        "key": "mantine-color-scheme",
        "defaultValue": preferredColorScheme
    });

    function toggleColorScheme(value?: ColorScheme) {
        setColorScheme(value ?? (colorScheme === "dark" ? "light" : "dark"));
    }

    const getLayout = Component.getLayout || (page => page);

    return (
        <ErrorBoundary FallbackComponent={RootErrorFallback} onReset={useQueryErrorResetBoundary().reset}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider withGlobalStyles withNormalizeCSS theme={{
                    "primaryColor": "green",
                    colorScheme
                }}>
                    {getLayout(<Component {...pageProps} />)}
                </MantineProvider>
            </ColorSchemeProvider>
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
