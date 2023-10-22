// todo:
// - line numbers, optional
// - syntax highlighting, optional

import { Slot, component$ } from "@builder.io/qwik";

import styles from "./code-block.module.css";

export const CodeBlock = component$(() => {
    return (
        <pre class={styles.codeBlock}>
            <code>
                <Slot/>
            </code>
        </pre>
    )
});
