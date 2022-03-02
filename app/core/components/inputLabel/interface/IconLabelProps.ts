import { ReactElement } from "react";
import TextInputOptions from "./TextLabelProps";

/**
 * Properties of an IconLabel
 */
export default interface IconLabelProps extends TextInputOptions {
    /**
     * The icon that will be displayed next to the label.
     */
    "icon": ReactElement
};
