import { Dispatch, SetStateAction } from "react";
import State from "../State";

export default interface NumberState extends State {
    "value": number,
    "set": Dispatch<SetStateAction<number>> | ((value) => void)
};
