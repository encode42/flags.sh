import type { ZodType } from "zod";
import type { AvailableConfig } from "~/data/config";
import { z } from "zod";
import { config } from "~/data/config";
import { operatingSystem } from "~/data/environment/operatingSystem";
import { serverType } from "~/data/environment/serverType";

type GenerateConfigSchema = {
    [key in AvailableConfig]: ZodType
}

const operatingSystemKeys = Object.keys(operatingSystem);
const serverTypeKeys = Object.keys(serverType);

function generateConfigSchema() {
    const schema: GenerateConfigSchema = {
        "operatingSystem": z.enum(operatingSystemKeys).default(operatingSystemKeys[0]), // todo: types
        "serverType": z.enum(serverTypeKeys).default(serverTypeKeys[0])
    };

    for (const [key, value] of Object.entries(config)) {
        schema[key] = z.any().default(value.default); // todo: default types
    }

    return z.object(schema);
}

export const APIGenerate = generateConfigSchema();
