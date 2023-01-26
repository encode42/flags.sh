import type { ZodType } from "zod";
import type { RequestEvent } from "@builder.io/qwik-city";
import { parse } from "~/util/parse/parse";

export function parseWrapper(schema: ZodType, object: any, json?: RequestEvent["json"]) {
    try {
        return parse(schema, object);
    } catch (error) {
        if (json) {
            throw json(400, error);
        }

        throw error;
    }
}
