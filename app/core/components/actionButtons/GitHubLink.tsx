import { siteDetails } from "../../../util/util";
import { ReactElement } from "react";
import { ActionIcon, Anchor } from "@mantine/core";
import { BrandGithub } from "tabler-icons-react";
import ActionButtonOptions from "./interfaces/ActionButtonOptions";

/**
 * A component that links to flag.sh's GitHub repository.
 *
 * @param filled Whether the button should be filled
 */
export function GitHubLink({ filled = false }: ActionButtonOptions): ReactElement {
    return (
        <Anchor href={siteDetails.links.github} target="_blank">
            <ActionIcon color="green" size="lg" variant={filled ? "filled" : "hover"} title="Visit the GitHub repository">
                <BrandGithub />
            </ActionIcon>
        </Anchor>
    );
}
