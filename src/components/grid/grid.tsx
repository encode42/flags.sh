// todo:
// max amount of items per row
// wrap and grow

import { Slot, component$ } from "@builder.io/qwik";
import styles from "./grid.module.css";

export const Grid = component$(() => {
    return (
        <div class={styles.grid}>
            <Slot/>
        </div>
    );
});
