import { ReactElement } from "react";
import { Group } from "@mantine/core";

/**
 * Options for the SideBySide component.
 */
interface SideBySideOptions {
    /**
     * Children to display on the left side of the parent.
     */
    "leftSide": ReactElement | ReactElement[],

    /**
     * Children to display on the right side of the parent.
     */
    "rightSide": ReactElement | ReactElement[]
}

/**
 * A component that displays two rows of items on either side of their parent.
 *
 * @param leftSide Children to display on the left side of the parent
 * @param rightSide Children to display on the right side of the parent
 */
export default function SideBySide({ leftSide, rightSide }: SideBySideOptions): ReactElement {
    return (
        <Group noWrap>
            <Group>{leftSide}</Group>
            <Group sx={{
                "marginLeft": "auto"
            }}>{rightSide}</Group>
        </Group>
    );
}
