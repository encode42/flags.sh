import SwitchState from "../../../../util/interface/state/component/SwitchState";
import NumberState from "../../../../util/interface/state/type/NumberState";
import DataModalProps from "../base/interface/DataModalProps";

/**
 * Properties for the memory modal.
 */
export default interface MemoryModalProps extends DataModalProps {
    /**
     * The amount of memory to allocate in gigabytes.
     */
    "memory": NumberState,

    /**
     * Whether to calculate additional memory overhead for Pterodactyl containers.
     */
    "pterodactyl": SwitchState
};
