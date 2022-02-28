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
