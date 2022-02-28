/**
 * Represents a class that can emit events.
 */
export default class EventClass {
    /**
     * Listeners that are attached to the class.
     */
    private listeners = new Map<string, Function>();

    /**
     * Add an event listener to the class.
     *
     * @param event Event to listen for
     * @param callback Callback to execute
     */
    addEventListener(event: string, callback: Function): void {
        this.listeners.set(event, callback);
    }

    /**
     * Emit an event.
     *
     * @param event Event to emit
     * @param [data={}] Data to emit with
     * @protected
     */
    emit(event: string, data = {}): void {
        for (const [key, value] of this.listeners) {
            if (key === event) {
                value(data);
            }
        }
    }
}
