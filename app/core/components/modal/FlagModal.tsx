import { useRef, useState } from "react";
import { Switch } from "@mantine/core";
import { OptionModal, OptionModalRef, ToggleState, InputCaption } from "@encode42/mantine-extras";
import { ModalProps } from "./interface/ModalProps";

/**
 * Properties for the flags modal.
 */
export interface FlagModalProps extends ModalProps {
    /**
     * Whether to add incubating vector flags for modern versions of Java Hotspot.
     */
    "defaultModernVectors": ToggleState
}

/**
 * Modal for additional flags options.
 */
export function FlagModal({ open, defaultModernVectors }: FlagModalProps) {
    const [pendingModernVectors, setPendingModernVectors] = useState<boolean>(defaultModernVectors.value);

    const modernVectors = {
        "set": setPendingModernVectors,
        "value": pendingModernVectors,
        "default": defaultModernVectors.value
    };

    const dataModal = useRef<OptionModalRef>(null);

    return (
        <OptionModal open={open} ref={dataModal} values={[modernVectors]} onApply={() => {
            defaultModernVectors.set(modernVectors.value);
        }}>
            {/* Modern Java switch */}
            <InputCaption text="Adds a flag that enables incubating SIMD vectors, which significantly speeds up map item rendering. Only applicable in Pufferfish-based forks and servers running Java 17 with Hotspot.">
                <Switch label="Modern Vectors" checked={modernVectors.value} disabled={defaultModernVectors.disabled} onChange={event => {
                    modernVectors.set(event.target.checked);
                }} />
            </InputCaption>
        </OptionModal>
    );
}
