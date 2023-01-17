import type { HTMLAttributes } from "@builder.io/qwik";
import { component$, Slot } from "@builder.io/qwik";

export interface LabelDescriptionProps extends HTMLAttributes<HTMLLabelElement> {
    "label": string,
    "description": string
}

export const LabelDescription = component$(({ label, description, ...other }: LabelDescriptionProps) => {
    return (
        <label {...other}>
            <h3>{label}</h3>
            <p>{description}</p>
            <Slot />
        </label>
    );
});
