import { Dispatch, SetStateAction } from "react";
import State from "../State";

export default interface BooleanState extends State {
    "value": boolean,
    "set": Dispatch<SetStateAction<boolean>> | ((value) => void)
};
