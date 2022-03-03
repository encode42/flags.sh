import { ReactChildren, ReactElement } from "react";
import DataModalProps from "./DataModalProps";

/**
 * Properties for a base modal.
 */
export default interface DataModalBaseProps extends DataModalProps {
    /**
     * Function to run when the apply button is pressed.
     */
    "onApply": () => void

    /**
     * Function to run when the close button is pressed.
     */
    "onClose"?: () => void

    /**
     * Default pending values.
     */
    "values": Record<string, any>,

    /**
     * The children of the modal.
     */
    "children": ReactElement | ReactElement[] | ReactChildren,
};
