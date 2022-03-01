import { Group } from "@mantine/core";
import ThemeToggle from "./ThemeToggle";
import { GitHubLink } from "./GitHubLink";
import { AboutLink } from "./AboutLink";
import ActionButtonOptions from "./interfaces/ActionButtonOptions";

export default function FooterRow({ filled = false }: ActionButtonOptions) {
    return (
        <Group noWrap>
            <ThemeToggle filled={filled} />
            <GitHubLink filled={filled} />
            <AboutLink filled={filled} />
        </Group>
    );
}
