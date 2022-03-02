import { ReactChildren, ReactElement } from "react";

/**
 * Properties of a Label
 */
export default interface LabelProps {
    /**
     * The label that will be displayed above the input.
     */
    "label": string | ReactElement,

    /**
     * The children utilized as the input.
     */
    "children": ReactElement | ReactElement[] | ReactChildren
};
