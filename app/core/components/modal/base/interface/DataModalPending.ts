/**
 * The fields and functions of a pending DataModal.
 */
export default interface DataModalPending<Type> {
    /**
     * The pending values.
     */
    "pending": Type,

    /**
     * Set a pending value.
     *
     * @param key Key to set
     * @param value Value to set
     */
    "set": (key: string, value: any) => void,

    /**
     * Reset the pending values to their provided defaults.
     */
    "reset": () => void
};
