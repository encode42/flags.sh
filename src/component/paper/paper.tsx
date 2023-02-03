import type { HTMLAttributes} from "@builder.io/qwik";
import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./paper.css?inline";

export interface PaperProps extends HTMLAttributes<HTMLDivElement> {}

export const Paper = component$(({...other}: PaperProps) => {
    other.class = `${other.class} paper`;

    useStylesScoped$(styles);

    return (
        <div {...other}>
            <Slot/>
        </div>
    );
});
