import type { ZodType } from "zod";
import { queryToObject } from "~/util/query/queryToObject";

export function parseQuery(schema: ZodType, query: URLSearchParams) {
    const object = queryToObject(query);

    const parsed = schema.safeParse(object);

    if (!parsed.success) {
        throw new Error("Invalid"); // todo
    }

    return parsed.data; // todo: type
}
