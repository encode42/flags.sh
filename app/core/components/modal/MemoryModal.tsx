import { useRef, useState } from "react";
import { NumberInput, Switch } from "@mantine/core";
import { OptionModal, OptionModalRef, NumberState, ToggleState, InputCaption, Label } from "@encode42/mantine-extras";
import { ModalProps } from "./interface/ModalProps";

// TODO: display memory input as mb as well

/**
 * Properties for the memory modal.
 */
export interface MemoryModalProps extends ModalProps {
    /**
     * The amount of memory to allocate in gigabytes.
     */
    "defaultMemory": NumberState,

    /**
     * Whether to calculate additional memory overhead for Pterodactyl containers.
     */
    "defaultPterodactyl": ToggleState
};

export function MemoryModal({ open, defaultMemory, defaultPterodactyl }: MemoryModalProps) {
    const [pendingMemory, setPendingMemory] = useState<number>(defaultMemory.value);
    const [pendingPterodactyl, setPendingPterodactyl] = useState<boolean>(defaultPterodactyl.value);

    const memoryValue = {
        "set": setPendingMemory,
        "value": pendingMemory,
        "default": defaultMemory.value
    };

    const pterodactylValue = {
        "set": setPendingPterodactyl,
        "value": pendingPterodactyl,
        "default": defaultPterodactyl.value
    };

    const dataModal = useRef<OptionModalRef>(null);

    return (
        <OptionModal open={open} values={[memoryValue, pterodactylValue]} ref={dataModal} onApply={() => {
            defaultMemory.set(memoryValue.value);
            defaultPterodactyl.set(pterodactylValue.value);
        }}>
            {/* Precise memory selector */}
            <Label label="Allocated memory (GB)">
                <NumberInput value={memoryValue.value} min={0} step={0.05} precision={2} onChange={value => {
                    if (!value) {
                        return;
                    }

                    memoryValue.set(value);
                }} />
            </Label>

            {/* Pterodactyl overhead switch */}
            <InputCaption text="Allocates 85% of the provided memory to account for Java overhead within containers and adds console-related flags. Only applicable within the Java Command tab.">
                <Switch label="Pterodactyl" checked={pterodactylValue.value} disabled={defaultPterodactyl.disabled} onChange={event => {
                    pterodactylValue.set(event.target.checked);
                }} />
            </InputCaption>
        </OptionModal>
    );
}
