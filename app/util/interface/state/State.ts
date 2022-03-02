import { Dispatch, SetStateAction } from "react";

export default interface State {
    "value": any,
    "set": Dispatch<SetStateAction<any>> | ((value) => void)
};
