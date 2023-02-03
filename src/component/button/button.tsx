import type { HTMLAttributes} from "@builder.io/qwik";
import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./button.css?inline";

export type ButtonStyle = "solid" | "accent" | "outline";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    "style"?: ButtonStyle
}

export enum ButtonStyles {
    "solid" = "button",
    "accent" = "button buttonAccent",
    "outline" = "button buttonOutline"
}

export const Button = component$(({ style = "solid", ...other }: ButtonProps) => {
    useStylesScoped$(styles);

    other.class = `${other.class ?? ""} ${ButtonStyles[style]}`;

    return (
        <button class="button" {...other}>
            <Slot/>
        </button>
    );
});
