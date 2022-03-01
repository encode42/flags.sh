import { Moon, Sun } from "tabler-icons-react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";

/**
 * A component that toggles between light and dark mode.
 */
export default function ThemeToggle() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <ActionIcon color="green" variant="filled" size="lg" title={`Switch to ${isDark ? "light" : "dark"} mode`} onClick={() => {
            toggleColorScheme();
        }}>
            {isDark ? <Sun /> : <Moon />}
        </ActionIcon>
    );
}

