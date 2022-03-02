import { Group, Modal as MantineModal } from "@mantine/core";
import ModalButtons from "./ModalButtons";
import ModalBaseProps from "./interface/ModalBaseProps";

/**
 * The base of a modal.
 */
export default function ModalBase({ open, apply, children, title = "Advanced options" }: ModalBaseProps) {
    {/*
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
    */}

    return (
        <MantineModal title={title} hideCloseButton centered opened={open.value} onClose={() => {
            open.set(false);
        }}>
            <Group direction="column" grow>
                {children}
            </Group>

            <ModalButtons open={open} apply={apply} />
        </MantineModal>
    );
}
