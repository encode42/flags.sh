import type { EnvironmentOptions } from "~/util/interface/environment/EnvironmentOptions";
import type { ServerTypeOption } from "~/util/interface/environment/ServerTypeOption";
import type { AvailableConfig } from "~/data/config";
import type { AvailableExtraFlags, AvailableFlags } from "~/data/flags";

export type AvailableServerType = keyof typeof serverType;

interface SharedFlags {
    [key: string]: (AvailableFlags | AvailableExtraFlags)[]
}

const sharedConfig: AvailableConfig[]  = [
    "fileName",
    "flags",
    "memory",
    "autoRestart",
    "variables"
];

const sharedFlags: SharedFlags = {
    "bukkit": ["none", "aikars"],
    "proxy": ["none", "proxy"]
};

export const serverType: EnvironmentOptions<ServerTypeOption> = {
    "paper": {
        "icon": "IconBucket",
        "flags": [
            ...sharedFlags.bukkit
        ],
        "config": [
            ...sharedConfig,
            "gui"
        ]
    },
    "purpur": {
        "icon": "IconBucket",
        "flags": [
            ...sharedFlags.bukkit
        ],
        "extraFlags": [
            "vectors"
        ],
        "config": [
            ...sharedConfig,
            "gui"
        ]
    },
    "velocity": {
        "icon": "IconNetwork",
        "flags": [
            ...sharedFlags.proxy
        ],
        "config": [
            ...sharedConfig
        ]
    },
    "waterfall": {
        "icon": "IconNetwork",
        "flags": [
            ...sharedFlags.proxy
        ],
        "config": [
            ...sharedConfig
        ]
    }
};

export const defaultServerType: AvailableServerType = "paper";
