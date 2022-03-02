import BooleanState from "../type/BooleanState";

/**
 * State template for a switch toggle.
 */
export default interface SwitchState extends BooleanState {
    "disabled": boolean
};
