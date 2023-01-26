import type { RequestHandler } from "@builder.io/qwik-city";
import type { GenerateOperatingSystemResult } from "~/util/interface/generate/GenerateOperatingSystem";
import { parseQuery } from "~/util/parse/query/parseQuery";
import { BaseConfigValidation, generateConfigSchema } from "~/util/validate";
import { generateResult } from "~/util/generateResult";

export const onGet: RequestHandler<GenerateOperatingSystemResult> = async ({ query, json }) => {
    const baseParsed = parseQuery(BaseConfigValidation, query, json);
    const schema = generateConfigSchema(baseParsed.operatingSystem, baseParsed.serverType);
    const parsed = parseQuery(schema, query, json);

    json(200, generateResult(schema, parsed));
};
