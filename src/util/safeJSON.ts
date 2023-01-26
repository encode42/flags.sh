export function safeJSON(value: any) {
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}
