import { ReactElement } from "react";
import { Link, Routes } from "blitz";
import { ActionIcon } from "@mantine/core";
import { Home } from "tabler-icons-react";
import ActionButtonOptions from "./interface/ActionButtonOptions";

/**
 * A component that links to the site's homepage.
 */
export function HomeLink({ filled = false }: ActionButtonOptions): ReactElement {
    return (
        <Link href={Routes.Home()}>
            <ActionIcon color="green" size="lg" variant={filled ? "filled" : "hover"} title="Return to the home page">
                <Home />
            </ActionIcon>
        </Link>
    );
}
