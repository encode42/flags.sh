import { ActionIcon, Group, Title, Anchor } from "@mantine/core";
import Logo from "../../assets/Logo";
import { ReactElement } from "react";

interface PageTitleOptions {
    "isHome"?: boolean
}

export default function PageTitle({ isHome = false }: PageTitleOptions): ReactElement {
    return (
        <Group>
            <ActionIcon size="xl" radius="xs" variant="transparent" component={Anchor}

                // @ts-ignore
                href={isHome ? "#" : "/"}>
                <Logo />
            </ActionIcon>
            <Title>flags.sh</Title>
        </Group>
    );
}
