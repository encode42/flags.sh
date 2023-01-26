import type { ZodType } from "zod";
import { queryToObject } from "~/util/parse/query/queryToObject";
import { safeParse } from "~/util/parse/safeParse";

export function safeParseQuery(schema: ZodType, query: URLSearchParams) {
    const object = queryToObject(query);

    return safeParse(schema, object);
}
