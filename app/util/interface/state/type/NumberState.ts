import { Dispatch, SetStateAction } from "react";
import State from "../State";

/**
 * State template for a number.
 */
export default interface NumberState extends State {
    /**
     * Value of the state.
     */
    "value": number,

    /**
     * Function to set the state.
     */
    "set": Dispatch<SetStateAction<number>> | ((value) => void)
};
