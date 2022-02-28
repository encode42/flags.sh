/**
 * Decode HTML encoding.
 *
 * @author https://stackoverflow.com/a/42182294
 * @param html HTML encoded string to decode.
 */
export function decodeHTML(html: string): string {
    const text = document.createElement("textarea");
    text.innerHTML = html;
    return text.value;
}

/**
 * Create a promise to wait for.
 *
 * @param ms Milliseconds to wait for.
 */
export async function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Wrap an object in an array if not already an array.
 *
 * @param object Object to wrap
 */
export function arrayify(object: any): any[] {
    let array = object;

    if (!Array.isArray(object)) {
        array = [object];
    }

    return array;
}
