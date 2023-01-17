export function safeParse(value: any) {
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}
