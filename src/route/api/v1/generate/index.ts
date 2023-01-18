import type { RequestHandler } from "@builder.io/qwik-city";
import type { GenerateOperatingSystemResult } from "~/util/interface/generate/GenerateOperatingSystem";
import { parseQuery } from "~/util/query/parseQuery";
import { extraFlags, flags } from "~/data/flags";
import { serverType } from "~/data/environment/serverType";
import { operatingSystem } from "~/data/environment/operatingSystem";
import { generateConfigSchema } from "~/util/validate";

export const onGet: RequestHandler<GenerateOperatingSystemResult> = async ({ query, json }) => {
    const parsed = parseQuery(generateConfigSchema(query, json), query, json);

    const selectedFlags = flags[parsed.flags];
    let generatedFlags: string[] = selectedFlags.generate(parsed);

    if (parsed.extraFlags) {
        for (const currentFlags of parsed.extraFlags) {
            const selectedFlags = extraFlags[currentFlags];

            generatedFlags = selectedFlags.generate({
                ...parsed,
                "existingFlags": generatedFlags
            }) ?? generatedFlags;
        }
    }

    const selectedServerType = serverType[parsed.serverType];

    generatedFlags = selectedServerType.generate?.({
        ...parsed,
        "existingFlags": generatedFlags
    }) ?? generatedFlags;

    const selectedOperatingSystem = operatingSystem[parsed.operatingSystem];
    const result = selectedOperatingSystem.generate({
        ...parsed,
        "existingFlags": generatedFlags
    }) ?? generatedFlags;

    json(200, {
        "result": result.result,
        "flags": result.flags
    });
};
