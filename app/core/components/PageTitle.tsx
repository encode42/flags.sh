import { SiteDetails } from "../../util/util";
import { ReactElement } from "react";
import { Link, Routes } from "blitz";
import { ActionIcon, Group, Title } from "@mantine/core";
import { Logo } from "../../asset/Logo";

/**
 * The title component.
 *
 * Includes logo and website name.
 */
export function PageTitle(): ReactElement {
    return (
        <Group>
            <Link href={Routes.Home()}>
                <ActionIcon size="xl" radius="xs" variant="transparent" title="Return to the home page">
                    <Logo />
                </ActionIcon>
            </Link>
            <Title>{SiteDetails.title}</Title>
        </Group>
    );
}
