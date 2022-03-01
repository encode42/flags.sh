import { AppProps, AuthorizationError, ErrorBoundary, ErrorComponent, ErrorFallbackProps, useQueryErrorResetBoundary } from "blitz";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useLocalStorageValue } from "@mantine/hooks";

/**
 * The standard app template for Blitz.js and Mantine UI.
 */
export default function App({ Component, pageProps }: AppProps) {
    const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
        "key": "mantine-color-scheme",
        "defaultValue": "dark"
    });

    // Toggle between light and dark themes
    function toggleColorScheme(value?: ColorScheme) {
        const targetScheme = value ?? (colorScheme === "dark" ? "light" : "dark");
        setColorScheme(targetScheme);
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

/**
 * The fallback error page.
 */
function RootErrorFallback({ error }: ErrorFallbackProps) {
    return error instanceof AuthorizationError ? (
        <ErrorComponent statusCode={error.statusCode} title="Sorry, you are not authorized to access this"/>
    ) : (
        <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    );
}
