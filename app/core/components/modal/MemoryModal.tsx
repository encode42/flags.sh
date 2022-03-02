import { NumberInput, Switch } from "@mantine/core";
import { useEffect, useState } from "react";
import MemoryModalProps from "./interface/MemoryModalProps";
import TextLabel from "../inputLabel/TextLabel";
import ModalBase from "./base/ModalBase";

// TODO: display memory input as mb as well

export default function MemoryModal({ open, memory, pterodactyl }: MemoryModalProps) {
    const [pending, setPending] = useState({
        "memory": memory.value,
        "pterodactyl": pterodactyl.value
    });

    useEffect(() => {
        setPending({
            ...pending,
            "memory": memory.value,
            "pterodactyl": pterodactyl.value
        });
    }, [memory.value]);

    return (
        <ModalBase open={open} apply={() => {
            memory.set(pending.memory);
            pterodactyl.set(pending.pterodactyl);
        }}>
            {/* Precise memory selector */}
            <TextLabel label="Allocated memory (GB)">
                <NumberInput value={pending.memory} min={0} step={0.05} precision={2} onChange={value => {
                    if (!value) {
                        return;
                    }

                    setPending({
                        ...pending,
                        "memory": value
                    });
                }} />
            </TextLabel>

            {/* Pterodactyl overhead switch */}
            <Switch label="Pterodactyl overhead" title="Allocate 85% of the container's memory to account for Java overhead." checked={pending.pterodactyl} disabled={pterodactyl.disabled} onChange={event => {
                setPending({
                    ...pending,
                    "pterodactyl": event.target.checked
                });
            }} />
        </ModalBase>
    );
}
