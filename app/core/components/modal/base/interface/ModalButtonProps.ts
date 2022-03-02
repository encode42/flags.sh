import BooleanState from "../../../../../util/interface/state/type/BooleanState";

/**
 * Properties for a modal's footer buttons.
 */
export default interface ModalButtonProps {
    /**
     * Whether the modal is opened.
     */
    "open": BooleanState,

    /**
     * Function to run when the apply button is pressed.
     */
    "apply": () => void
};
