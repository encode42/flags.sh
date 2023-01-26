import type { ZodType } from "zod";
import type { AvailableConfig } from "~/data/config";
import type { AvailableOperatingSystem} from "~/data/environment/operatingSystem";
import type { AvailableServerType} from "~/data/environment/serverType";
import { z } from "zod";
import { config } from "~/data/config";
import { defaultOperatingSystem, operatingSystem } from "~/data/environment/operatingSystem";
import { defaultServerType, serverType } from "~/data/environment/serverType";

type GenerateConfigSchema = {
    [key in AvailableConfig]: ZodType
}

const operatingSystemKeys = Object.keys(operatingSystem);
const serverTypeKeys = Object.keys(serverType);

export const BaseConfigValidation = z.object({
    "operatingSystem": z.enum(operatingSystemKeys).default(defaultOperatingSystem), // todo: types
    "serverType": z.enum(serverTypeKeys).default(defaultServerType), // todo: types
    "withHTML": z.boolean().default(false),
    "withFlags": z.boolean().default(true),
    "withResult": z.boolean().default(true)
});

export function generateConfigSchema(requestOperatingSystem: AvailableOperatingSystem, requestServerType: AvailableServerType) {
    const schema: GenerateConfigSchema = {};

    const selectedOperatingSystem = operatingSystem[requestOperatingSystem];
    const selectedServerType = serverType[requestServerType];

    for (const [key, value] of Object.entries(config)) {
        // Config option not supported
        if (!selectedOperatingSystem.config.includes(key) || !selectedServerType.config.includes(key)) {
            schema[key] = z.never().optional();
            continue;
        }

        schema[key] = value.type.default(value.default);
    }

    // Server type's accepted flags
    schema.flags = z.nativeEnum(selectedServerType.flags).default(selectedServerType.default.flags); // todo: types

    // Server type's accepted extra flags
    schema.extraFlags = (!selectedServerType.extraFlags || selectedServerType.extraFlags.length === 0) ? z.never().optional() : z.array(z.nativeEnum(selectedServerType.extraFlags)).default(selectedServerType.default.extraFlags ?? []); // todo: types

    return BaseConfigValidation.extend(schema);
}
