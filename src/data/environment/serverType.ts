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
        "default": {
            "flags": "aikars"
        },
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
        "default": {
            "flags": "aikars",
            "extraFlags": ["vectors"]
        },
        "extraFlags": [
            "vectors"
        ],
        "config": [
            ...sharedConfig,
            "extraFlags",
            "gui"
        ]
    },
    "velocity": {
        "icon": "IconNetwork",
        "flags": [
            ...sharedFlags.proxy
        ],
        "default": {
            "flags": "proxy"
        },
        "config": [
            ...sharedConfig
        ]
    },
    "waterfall": {
        "icon": "IconNetwork",
        "default": {
            "flags": "proxy"
        },
        "flags": [
            ...sharedFlags.proxy
        ],
        "config": [
            ...sharedConfig
        ]
    }
};

export const defaultServerType: AvailableServerType = "paper";
