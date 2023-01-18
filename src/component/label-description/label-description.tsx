import type { HTMLAttributes } from "@builder.io/qwik";
import { component$, Slot } from "@builder.io/qwik";

export interface LabelDescriptionProps extends HTMLAttributes<HTMLDivElement> {
    "label": string,
    "description": string
}

export const LabelDescription = component$(({ label, description, ...other }: LabelDescriptionProps) => {
    other.class = `form-control ${other.class}`; // hacky workaround

    return (
        <div {...other}>
            <label class="label">
                <span class="label-text">{label}</span>
            </label>
            <Slot />
            <label class="label">
                <span class="label-text-alt">{description}</span>
            </label>
        </div>
    );
});
