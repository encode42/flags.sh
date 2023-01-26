import { safeJSON } from "~/util/safeJSON";

export function queryToObject(query: URLSearchParams) {
    const object = Object.fromEntries(query);

    for (const [key, value] of Object.entries(object)) {
        if (value === "") {
            object[key] = true; // todo: type
            continue;
        }

        object[key] = safeJSON(value);
    }

    return object;
}
