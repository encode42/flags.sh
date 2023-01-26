import type { EnvironmentOptions } from "~/util/interface/environment/EnvironmentOptions";
import type { ServerTypeOption } from "~/util/interface/environment/ServerTypeOption";
import type { AvailableConfig } from "~/data/config";
import type { AvailableExtraFlags, AvailableFlags } from "~/data/flags";

export type AvailableServerType = keyof typeof serverType;

interface SharedFlags<T = AvailableFlags> {
    [key: string]: T[]
}

const sharedConfig: AvailableConfig[]  = [
    "fileName",
    "flags",
    "memory",
    "autoRestart",
    "variables"
];

const sharedFlags: SharedFlags = {
    "bukkit": ["none", "aikars", "benchmarkedG1GC", "benchmarkedZGC", "benchmarkedShenandoah", "hillttys", "obyduxs", "etils"],
    "proxy": ["none", "proxy"]
};

const sharedExtraFlags: SharedFlags<AvailableExtraFlags> = {
    "bukkit": ["benchmarkedGraalVM"]
};

export const serverType: EnvironmentOptions<ServerTypeOption> = {
    "paper": {
        "icon": "IconBucket",
        "flags": [
            ...sharedFlags.bukkit
        ],
        "extraFlags": [
            ...sharedExtraFlags.bukkit
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
        "extraFlags": [
            ...sharedExtraFlags.bukkit,
            "vectors"
        ],
        "default": {
            "flags": "aikars",
            "extraFlags": ["vectors"]
        },
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
