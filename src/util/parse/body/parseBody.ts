import type { ZodType } from "zod";
import type { RequestEvent } from "@builder.io/qwik-city";
import { safeJSON } from "~/util/safeJSON";
import { parseWrapper } from "~/util/parse/wrapper/parseWrapper";

export function parseBody(schema: ZodType, body: BodyInit, json?: RequestEvent["json"]) { // todo: return type
    return parseWrapper(schema, safeJSON(body), json);
}
