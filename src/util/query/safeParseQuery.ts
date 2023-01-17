import type { ZodType } from "zod";
import { queryToObject } from "~/util/query/queryToObject";

export function safeParseQuery(schema: ZodType, query: URLSearchParams) {
    const object = queryToObject(query);

    return schema.safeParse(object);
}
