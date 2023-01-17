import type { HTMLAttributes } from "@builder.io/qwik";
import type { LabelDescriptionProps } from "~/component/label-description/label-description";
import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { LabelDescription } from "~/component/label-description/label-description";
import styles from "./config.css?inline";

export interface SharedConfigProps<T extends HTMLElement | unknown> {
    "onChange$": HTMLAttributes<T>["onChange$"],
    "visible"?: boolean
}

export interface ConfigProps extends LabelDescriptionProps, SharedConfigProps<unknown> {}

export const Config = component$(({ visible = true, ...other }: ConfigProps) => {
    useStyles$(styles);

    return (
        <LabelDescription class={visible ? undefined : "configHidden"} {...other}>
            <Slot />
        </LabelDescription>
    );
});
