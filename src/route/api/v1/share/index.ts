import type { RequestHandler } from "@builder.io/qwik-city";
import { createId } from "@paralleldrive/cuid2";
import { BaseConfigValidation, generateConfigSchema } from "~/util/validate";
import { generateResult } from "~/util/generateResult";
import { parseBody } from "~/util/parse/body/parseBody";

export const onPost: RequestHandler = async ({ request, json, platform }) => {
    const body = await request.text();

    const baseParsed = parseBody(BaseConfigValidation, body);
    const schema = generateConfigSchema(baseParsed.operatingSystem, baseParsed.serverType);
    const parsed = parseBody(schema, body, json);

    const generate = generateResult(schema, parsed);

    const id = createId();

    if (platform.CLOUDFLARE_BUCKET) {
        await platform.CLOUDFLARE_BUCKET.put(id, JSON.stringify(generate));
    }

    json(200, {
        id
    });
};
