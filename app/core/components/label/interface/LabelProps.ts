import { ReactElement } from "react";
import OptionalChildrenProps from "../../../../util/interface/OptionalChildrenProps";

/**
 * Properties of a Label
 */
export default interface LabelProps extends OptionalChildrenProps {
    /**
     * The label that will be displayed above the input.
     */
    "label": string | ReactElement,
};
