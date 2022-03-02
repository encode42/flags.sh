import { Dispatch, SetStateAction } from "react";
import State from "../State";

/**
 * State template for a boolean.
 */
export default interface BooleanState extends State {
    /**
     * Value of the state.
     */
    "value": boolean,

    /**
     * Function to set the state.
     */
    "set": Dispatch<SetStateAction<boolean>> | ((value) => void)
};
