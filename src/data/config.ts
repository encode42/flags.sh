import type { ZodType } from "zod";
import { z } from "zod";
import { extraFlags, flags } from "~/data/flags";
import { defaultServerType, serverType } from "~/data/environment/serverType";
import { defaultOperatingSystem } from "~/data/environment/operatingSystem";

export type AvailableConfig = keyof typeof config;

export interface Config {
    [key: string]: {
        "isAdvanced"?: boolean,
        "type": ZodType,
        "default"?: any
    }
}

type DefaultConfig = {
    [key in AvailableConfig]: any
}

export const config: Config = {
    "fileName": {
        "type": z.string().min(1).max(25),
        "default": "server.jar"
    },
    "flags": {
        "type": z.nativeEnum(Object.keys(flags)) // todo: types
    },
    "extraFlags": {
        "type": z.array(z.nativeEnum(Object.keys(extraFlags))) // todo: types
    },
    "memory": {
        "type": z.number().min(2).max(16),
        "default": 4
    },
    "gui": {
        "type": z.boolean(),
        "default": false
    },
    "autoRestart": {
        "type": z.boolean(),
        "default": false
    },
    "variables": {
        "type": z.boolean(),
        "isAdvanced": true,
        "default": false
    }
};

export function getDefaults() {
    const defaultConfig: DefaultConfig = {};
    for (const [key, value] of Object.entries(config)) {
        defaultConfig[key] = value.default;
    }

    const selectedServerType = serverType[defaultServerType];
    defaultConfig.operatingSystem = defaultOperatingSystem;
    defaultConfig.serverType = defaultServerType;
    defaultConfig.flags = selectedServerType.default.flags;
    defaultConfig.extraFlags = selectedServerType.default.extraFlags;

    return defaultConfig;
}
