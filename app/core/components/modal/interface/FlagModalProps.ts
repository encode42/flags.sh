import SwitchState from "../../../../util/interface/state/component/SwitchState";
import DataModalProps from "../base/interface/DataModalProps";

/**
 * Properties for the flags modal.
 */
export default interface FlagModalProps extends DataModalProps {
    /**
     * Whether to add flags for modern versions of Java.
     */
    "modernJava": SwitchState
};
