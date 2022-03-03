import { Switch } from "@mantine/core";
import { useRef, useState } from "react";
import FlagModalProps from "./interface/FlagModalProps";
import DataModalBase from "./base/DataModalBase";
import InputCaption from "../caption/InputCaption";
import DataModalPending from "./base/interface/DataModalPending";

/**
 * Modal for additional flags options.
 */
export default function FlagModal({ open, modernJava }: FlagModalProps) {
    const values = {
        "modernJava": modernJava.value
    };

    const dataModal = useRef<DataModalPending<typeof values>>();

    return (
        <DataModalBase open={open} ref={dataModal} values={values} onApply={() => {
            const pending = dataModal.current?.pending;

            if (pending) {
                modernJava.set(pending.modernJava);
            }
        }}>
            {/* Modern Java switch */}
            <InputCaption text="Adds a flag that enables Java 17 vectors, which significantly speeds up map item rendering. Only applicable in Pufferfish-based forks.">
                <Switch label="Java 17" checked={dataModal.current?.pending.modernJava} disabled={modernJava.disabled} onChange={event => {
                    dataModal.current?.set("modernJava", event.target.checked);
                }} />
            </InputCaption>
        </DataModalBase>
    );
}
