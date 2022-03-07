import { ReactElement } from "react";
import { Link, Routes } from "blitz";
import { ActionIcon } from "@mantine/core";
import { QuestionMark } from "tabler-icons-react";
import { ActionButtonOptions } from "./interface/ActionButtonOptions";

/**
 * A component that links to the site's about page.
 */
export function AboutLink({ filled = false }: ActionButtonOptions): ReactElement {
    return (
        <Link href={Routes.About()}>
            <ActionIcon color="green" size="lg" variant={filled ? "filled" : "hover"} title="Visit the about page">
                <QuestionMark />
            </ActionIcon>
        </Link>
    );
}
