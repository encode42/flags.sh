import BooleanState from "../../../../../util/interface/state/type/BooleanState";
import { MutableRefObject } from "react";

/**
 * Properties for a modal's footer buttons.
 */
export default interface DataModalButtonProps {
    /**
     * Whether the modal is opened.
     */
    "open": BooleanState,

    /**
     * The ref of the close button to focus on while closing.
     */
    "closeRef"?: MutableRefObject<HTMLButtonElement | null>,

    /**
     * Function to run when the apply button is pressed.
     */
    "onApply": () => void,

    /**
     * Function to run when the close button is pressed.
     */
    "onClose"?: () => void
};
