import { Button, Group } from "@mantine/core";
import DataModalButtonProps from "./interface/DataModalButtonProps";

/**
 * The footer buttons of a modal.
 */
export default function DataModalButtons({ open, closeRef, onClose, onApply }: DataModalButtonProps) {
    return (
        <Group position="right">
            <Button color="red" variant="outline" ref={closeRef} onClick={() => {
                open.set(false);
                onClose?.();
            }}>Cancel</Button>
            <Button onClick={() => {
                onApply();
                open.set(false);
            }}>Apply</Button>
        </Group>
    );
}
