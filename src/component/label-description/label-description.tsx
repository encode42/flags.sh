import type { HTMLAttributes } from "@builder.io/qwik";
import { component$, Slot } from "@builder.io/qwik";

export interface LabelDescriptionProps extends HTMLAttributes<HTMLDivElement> {
    "label": string,
    "description": string
}

export const LabelDescription = component$(({ label, description, ...other }: LabelDescriptionProps) => {
    other.class = `form-control ${other.class}`;

    return (
        <div {...other}>
            <label>
                {label}
            </label>
            <Slot/>
            <label>
                {description}
            </label>
        </div>
    );
});
