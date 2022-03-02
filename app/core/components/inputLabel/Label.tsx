import { Group } from "@mantine/core";
import LabelProps from "./interface/LabelProps";

/**
 * Component that contains a label for an input component.
 */
export default function Label({ label, children }: LabelProps) {
    return (
        <Group direction="column" grow spacing={5}>
            <Group spacing={2.5}>
                {label}
            </Group>
            {children}
        </Group>
    );
}
