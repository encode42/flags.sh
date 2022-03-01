import { Moon, Sun } from "tabler-icons-react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { ReactElement } from "react";
import ActionButtonOptions from "./interface/ActionButtonOptions";

/**
 * A component that toggles between light and dark mode.
 */
export default function ThemeToggle({ filled = false }: ActionButtonOptions): ReactElement {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <ActionIcon color="green" variant={filled ? "filled" : "hover"} size="lg" title={`Switch to ${isDark ? "light" : "dark"} mode`} onClick={() => {
            toggleColorScheme();
        }}>
            {isDark ? <Sun /> : <Moon />}
        </ActionIcon>
    );
}

