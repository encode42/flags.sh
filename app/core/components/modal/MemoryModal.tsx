import { NumberInput, Switch } from "@mantine/core";
import { useRef } from "react";
import MemoryModalProps from "./interface/MemoryModalProps";
import TextLabel from "../label/TextLabel";
import DataModalBase from "./base/DataModalBase";
import InputCaption from "../caption/InputCaption";
import DataModalPending from "./base/interface/DataModalPending";

// TODO: display memory input as mb as well

export default function MemoryModal({ open, memory, pterodactyl }: MemoryModalProps) {
    const values = {
        "memory": memory.value,
        "pterodactyl": pterodactyl.value
    };

    const dataModal = useRef<DataModalPending<typeof values>>();

    return (
        <DataModalBase open={open} values={values} ref={dataModal} onApply={() => {
            const pending = dataModal.current?.pending;

            if (pending) {
                memory.set(pending.memory);
                pterodactyl.set(pending.pterodactyl);
            }
        }}>
            {/* Precise memory selector */}
            <TextLabel label="Allocated memory (GB)">
                <NumberInput value={dataModal.current?.pending.memory} min={0} step={0.05} precision={2} onChange={value => {
                    if (!value) {
                        return;
                    }

                    dataModal.current?.set("memory", value);
                }} />
            </TextLabel>

            {/* Pterodactyl overhead switch */}
            <InputCaption text="Allocates 85% of the provided memory to account for Java overhead within containers. Only applicable within the Java Command tab.">
                <Switch label="Pterodactyl overhead" checked={dataModal.current?.pending.pterodactyl} disabled={pterodactyl.disabled} onChange={event => {
                    dataModal.current?.set("pterodactyl", event.target.checked);
                }} />
            </InputCaption>
        </DataModalBase>
    );
}
