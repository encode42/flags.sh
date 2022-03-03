import { Group } from "@mantine/core";
import Caption from "./Caption";
import CaptionProps from "./interface/CaptionProps";

/**
 * A caption text-based component attached to an input.
 */
export default function InputCaption({ text, children }: CaptionProps) {
    return (
        <Group direction="column" spacing={2.5} grow>
            {children}

            <Caption text={text} />
        </Group>
    );
}
