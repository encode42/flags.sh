import Label from "./Label";
import { Text } from "@mantine/core";
import IconLabelProps from "./interface/IconLabelProps";

/**
 * Component that contains a text label and icon for an input component.
 */
export default function IconInput({ label, icon, children }: IconLabelProps) {
    return (
        <Label label={
            <>
                <Text size="sm">{label}</Text>

                {icon}
            </>
        }>
            {children}
        </Label>
    );
}
