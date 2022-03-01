import FileSaver from "file-saver";

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

/**
 * Save text to a file.
 *
 * @param contents Contents of the file
 * @param filename Name of the file
 */
export function saveText(contents: string, filename: string): void {
    const blob = new Blob([contents], { "type": "text/plain" });
    FileSaver.saveAs(blob, filename);
}
