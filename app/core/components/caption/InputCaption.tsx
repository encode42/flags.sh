import InputCaptionProps from "./interface/InputCaptionProps";
import { Group } from "@mantine/core";
import Caption from "./Caption";

/**
 * A caption text-based component attached to an input.
 */
export default function InputCaption({ text, children }: InputCaptionProps) {
    return (
        <Group direction="column" spacing={2.5} grow>
            {children}

            <Caption text={text} />
        </Group>
    );
}
