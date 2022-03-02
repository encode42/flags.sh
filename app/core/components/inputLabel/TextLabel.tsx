import Label from "./Label";
import { Text } from "@mantine/core";
import TextInputOptions from "./interface/TextLabelProps";

/**
 * Component that contains a text label for an input component.
 */
export default function TextLabel({ label, children }: TextInputOptions) {
    return (
        <Label label={
            <>
                <Text size="sm">{label}</Text>
            </>
        }>
            {children}
        </Label>
    );
}
