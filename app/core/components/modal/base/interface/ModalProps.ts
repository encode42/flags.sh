import BooleanState from "../../../../../util/interface/state/type/BooleanState";

/**
 * Properties for a modal.
 */
export default interface ModalProps {
    /**
     * Whether the modal is opened.
     */
    "open": BooleanState,

    /**
     * The title of the modal.
     */
    "title"?: string
};
