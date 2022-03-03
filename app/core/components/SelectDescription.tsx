import { Group, Text } from "@mantine/core";
import Caption from "./caption/Caption";
import { forwardRef } from "react";

function SelectDescription({ label, description, ...others }, ref) {
    return (
        <div ref={ref} {...others}>
            <Group direction="column" spacing={0} noWrap>
                <Text>{label}</Text>
                <Caption>{description}</Caption>
            </Group>
        </div>
    );
}

export default forwardRef(SelectDescription);
