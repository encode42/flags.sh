import { ActionIcon, Group, Title } from "@mantine/core";
import Logo from "../../assets/Logo";
import { ReactElement } from "react";

export default function PageTitle(): ReactElement {
    return (
        <Group>
            <ActionIcon size="xl" radius="xs" variant="transparent">
                <Logo />
            </ActionIcon>
            <Title>flags.sh</Title>
        </Group>
    );
}
