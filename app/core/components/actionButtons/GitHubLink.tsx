import { ReactElement } from "react";
import { ActionIcon, Anchor, Group } from "@mantine/core";
import { BrandGithub } from "tabler-icons-react";
import ActionButtonOptions from "./interfaces/ActionButtonOptions";

export function GitHubLink({ filled = false }: ActionButtonOptions): ReactElement {
    return (
        <ActionIcon color="green" size="lg" component={Anchor} href="https://github.com/Encode42/flags.sh" target="_blank">
            <BrandGithub />
        </ActionIcon>
    );
}
