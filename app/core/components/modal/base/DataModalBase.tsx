import { Group, Modal as MantineModal } from "@mantine/core";
import DataModalButtons from "./DataModalButtons";
import DataModalBaseProps from "./interface/DataModalBaseProps";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

/**
 * The base of a modal.
 */
function DataModalBase({ open, onClose, onApply, title = "Advanced options", values, children }: DataModalBaseProps, ref) {
    const [pending, setPending] = useState({ ...values });

    const closeRef = useRef<HTMLButtonElement>(null);

    /**
     * Set a pending value.
     */
    function set(key: string, value: any) {
        const pendingClone = { ...pending };

        pendingClone[key] = value;

        setPending(pendingClone);
    }

    /**
     * Reset the pending values.
     */
    function reset() {
        setPending({ ...values });
    }

    // Update the default values
    useEffect(() => {
        if (open.value) {
            reset();
        }
    }, [open.value]);

    // Pass the values through ref
    useImperativeHandle(ref, () => ({
        "set": set,
        "reset": reset,
        "pending": pending
    }));

    return (
        <MantineModal title={title} hideCloseButton centered opened={open.value} onClose={() => {
            if (closeRef.current) {
                closeRef.current.focus();
            }

            open.set(false);
            reset();
            onClose?.();
        }}>
            <Group direction="column" grow>
                {children}

                <DataModalButtons open={open} closeRef={closeRef} onClose={onClose} onApply={onApply} />
            </Group>
        </MantineModal>
    );
}

export default forwardRef(DataModalBase);
