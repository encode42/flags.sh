import { ReactElement } from "react";
import { ActionIcon } from "@mantine/core";
import { Home } from "tabler-icons-react";
import ActionButtonOptions from "./interfaces/ActionButtonOptions";
import { Link, Routes } from "blitz";

export function HomeLink({ filled = false }: ActionButtonOptions): ReactElement {
    return (
        <Link href={Routes.Home()}>
            <ActionIcon color="green" size="lg" variant={filled ? "filled" : "hover"}>
                <Home />
            </ActionIcon>
        </Link>
    );
}
