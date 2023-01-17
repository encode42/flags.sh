import { safeParse } from "~/util/safeParse";

export function queryToObject(query: URLSearchParams) {
    const object = Object.fromEntries(query);

    for (const [key, value] of Object.entries(object)) {
        if (value === "") {
            object[key] = true; //todo: type
            continue;
        }

        object[key] = safeParse(value);
    }

    return object;
}
