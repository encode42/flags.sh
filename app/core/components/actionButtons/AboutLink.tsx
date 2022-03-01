import { ReactElement } from "react";
import { ActionIcon } from "@mantine/core";
import { QuestionMark } from "tabler-icons-react";
import ActionButtonOptions from "./interfaces/ActionButtonOptions";
import { Link, Routes } from "blitz";

export function AboutLink({ filled = false }: ActionButtonOptions): ReactElement {
    return (
        <Link href={Routes.About()}>
            <ActionIcon color="green" size="lg" variant={filled ? "filled" : "hover"}>
                <QuestionMark />
            </ActionIcon>
        </Link>
    );
}
