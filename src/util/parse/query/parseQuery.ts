import type { ZodType } from "zod";
import type { RequestEvent } from "@builder.io/qwik-city";
import { queryToObject } from "~/util/parse/query/queryToObject";
import { parseWrapper } from "~/util/parse/wrapper/parseWrapper";

export function parseQuery(schema: ZodType, query: URLSearchParams, json?: RequestEvent["json"]) { // todo: return type
    return parseWrapper(schema, queryToObject(query), json);
}
