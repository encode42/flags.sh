import type { ZodType } from "zod";
import { z } from "zod";
import { extraFlags, flags } from "~/data/flags";

export type AvailableConfig = keyof typeof config;

export interface Config {
    [key: string]: {
        "isAdvanced"?: boolean,
        "type": ZodType,
        "default": any // todo
    }
}

export const config: Config = {
    "fileName": {
        "type": z.string().min(1).max(25),
        "default": "server.jar"
    },
    "flags": {
        "type": z.nativeEnum(Object.keys(flags)),
        "default": "aikars"
    },
    "extraFlags": {
        "type": z.array(z.nativeEnum(Object.keys(extraFlags))),
        "default": ["vectors"]
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
