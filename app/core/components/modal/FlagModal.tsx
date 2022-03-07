import { useRef, useState } from "react";
import { Switch } from "@mantine/core";
import { OptionModal, OptionModalRef, ToggleState, InputCaption } from "@encode42/mantine-extras";
import { ModalProps } from "./interface/ModalProps";

/**
 * Properties for the flags modal.
 */
export interface FlagModalProps extends ModalProps {
    /**
     * Whether to add flags for modern versions of Java.
     */
    "defaultModernJava": ToggleState
}

/**
 * Modal for additional flags options.
 */
export function FlagModal({ open, defaultModernJava }: FlagModalProps) {
    const [pendingModernJava, setPendingModernJava] = useState<boolean>(defaultModernJava.value);

    const modernJavaValue = {
        "set": setPendingModernJava,
        "value": pendingModernJava,
        "default": defaultModernJava.value
    };

    const dataModal = useRef<OptionModalRef>(null);

    return (
        <OptionModal open={open} ref={dataModal} values={[modernJavaValue]} onApply={() => {
            defaultModernJava.set(modernJavaValue.value);
        }}>
            {/* Modern Java switch */}
            <InputCaption text="Adds a flag that enables Java 17 vectors, which significantly speeds up map item rendering. Only applicable in Pufferfish-based forks.">
                <Switch label="Java 17" checked={modernJavaValue.value} disabled={defaultModernJava.disabled} onChange={event => {
                    modernJavaValue.set(event.target.checked);
                }} />
            </InputCaption>
        </OptionModal>
    );
}
