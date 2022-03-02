import { ReactChildren, ReactElement } from "react";
import ModalProps from "./ModalProps";

/**
 * Properties for a base modal.
 */
export default interface ModalBaseProps extends ModalProps {
    /**
     * The children of the modal.
     */
    "children": ReactElement | ReactElement[] | ReactChildren,

    /**
     * Function to run when the apply button is pressed.
     */
    "apply": () => void
};
