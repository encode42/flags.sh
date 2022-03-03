import { ReactElement } from "react";
import ChildrenProps from "../../../../util/interface/ChildrenProps";

/**
 * Properties of a Label
 */
export default interface LabelProps extends ChildrenProps {
    /**
     * The label that will be displayed above the input.
     */
    "label": string | ReactElement,
};
