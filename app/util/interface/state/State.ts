import { Dispatch, SetStateAction } from "react";

/**
 * A state template.
 */
export default interface State {
    /**
     * Value of the state.
     */
    "value": any,

    /**
     * Function to set the state.
     */
    "set": Dispatch<SetStateAction<any>> | ((value) => void)
};
