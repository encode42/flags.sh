import { Group } from "@mantine/core";

export default function SideBySide({ leftSide, rightSide }) {
    return (
        <Group noWrap>
            <Group>{leftSide}</Group>
            <Group sx={{
                "marginLeft": "auto"
            }}>{rightSide}</Group>
        </Group>
    );
}
