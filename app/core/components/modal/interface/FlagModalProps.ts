import SwitchState from "../../../../util/interface/state/component/SwitchState";
import ModalProps from "../base/interface/ModalProps";

/**
 * Properties for the flags modal.
 */
export default interface FlagModalProps extends ModalProps {
    /**
     * Whether to add flags for modern versions of Java.
     */
    "modernJava": SwitchState
};
