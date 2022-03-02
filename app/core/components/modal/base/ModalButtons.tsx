import { Button, Group } from "@mantine/core";
import ModalButtonProps from "./interface/ModalButtonProps";

/**
 * The footer buttons of a modal.
 */
export default function ModalButtons({ open, apply }: ModalButtonProps) {
    return (
        <Group position="right">
            <Button color="red" variant="outline" onClick={() => {
                open.set(false);
            }}>Cancel</Button>
            <Button onClick={() => {
                apply();
                open.set(false);
            }}>Apply</Button>
        </Group>
    );
}
