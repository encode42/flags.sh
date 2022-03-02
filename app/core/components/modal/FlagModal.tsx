import { Switch } from "@mantine/core";
import { useEffect, useState } from "react";
import FlagModalProps from "./interface/FlagModalProps";
import ModalBase from "./base/ModalBase";

/**
 * Modal for additional flags options.
 */
export default function FlagModal({ open, modernJava }: FlagModalProps) {
    const [pending, setPending] = useState({
        "modernJava": modernJava.value
    });

    // Update the default values
    useEffect(() => {
        setPending({
            ...pending,
            "modernJava": modernJava.value
        });
    }, [modernJava.value]);

    return (
        <ModalBase open={open} apply={() => {
            modernJava.set(pending.modernJava);
        }}>
            {/* Modern Java switch */}
            <Switch label="Java 17" checked={pending.modernJava} disabled={modernJava.disabled} onChange={event => {
                setPending({
                    ...pending,
                    "modernJava": event.target.checked
                });
            }} />
        </ModalBase>
    );
}
