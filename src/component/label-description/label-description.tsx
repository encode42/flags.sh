import type { HTMLAttributes } from "@builder.io/qwik";
import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./label-description.css?inline";

export interface LabelDescriptionProps extends HTMLAttributes<HTMLLabelElement> {
    "label": string,
    "description": string
}

export const LabelDescription = component$(({ label, description, ...other }: LabelDescriptionProps) => {
    other.class = `${other.class}`;

    useStylesScoped$(styles);

    return (
        <label {...other}>
            <h3>{label}</h3>
            <Slot/>
            <p>{description}</p>
        </label>
    );
});
