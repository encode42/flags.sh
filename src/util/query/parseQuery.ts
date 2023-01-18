import type { ZodType } from "zod";
import type { RequestEvent } from "@builder.io/qwik-city";
import { queryToObject } from "~/util/query/queryToObject";

export function parseQuery(schema: ZodType, query: URLSearchParams, json?: RequestEvent["json"]) { // todo: return type
    const object = queryToObject(query);

    const parsed = schema.safeParse(object);
    if (!parsed.success) {
        if (json) {
            throw json(400, parsed.error);
        }

        throw parsed.error;
    }

    return parsed.data;
}
