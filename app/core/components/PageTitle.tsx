import { ActionIcon, Group, Title } from "@mantine/core";
import Logo from "../../assets/Logo";

export default function PageTitle() {
    return (
        <Group>
            <ActionIcon size="xl" radius="xs" variant="transparent">
                <Logo />
            </ActionIcon>
            <Title>flags.sh</Title>
        </Group>
    );
}
