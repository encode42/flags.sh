import type { AvailableConfig } from "~/data/config";
import type { AvailableOperatingSystem } from "~/data/environment/operatingSystem";
import type { AvailableServerType } from "~/data/environment/serverType";
import type { Generate } from "~/util/interface/generate/Generate";

export type AvailableFlags = keyof typeof flags;
export type AvailableExtraFlags = keyof typeof extraFlags;

interface FlagOption {
    "generate": Generate<AvailableConfig & AvailableOperatingSystem & AvailableServerType>
}

interface FlagExtraOption extends FlagOption {
    "supports": AvailableFlags[],
    "generate": Generate<AvailableConfig & AvailableOperatingSystem & AvailableServerType | "existingFlags">
}

interface Flags {
    [key: string]: FlagOption
}

interface ExtraFlags {
    [key: string]: FlagExtraOption
}

const baseAikar = [
    "-XX:+UseG1GC",
    "-XX:+ParallelRefProcEnabled",
    "-XX:MaxGCPauseMillis=200",
    "-XX:+UnlockExperimentalVMOptions",
    "-XX:+DisableExplicitGC",
    "-XX:+AlwaysPreTouch",
    "-XX:G1HeapWastePercent=5",
    "-XX:G1MixedGCCountTarget=4",
    "-XX:InitiatingHeapOccupancyPercent=15",
    "-XX:G1MixedGCLiveThresholdPercent=90",
    "-XX:G1RSetUpdatingPauseTimePercent=5",
    "-XX:SurvivorRatio=32",
    "-XX:+PerfDisableSharedMem",
    "-XX:MaxTenuringThreshold=1",
    "-Dusing.aikars.flags=https://mcflags.emc.gs",
    "-Daikars.new.flags=true",
    "-XX:G1NewSizePercent=30",
    "-XX:G1MaxNewSizePercent=40",
    "-XX:G1HeapRegionSize=8M",
    "-XX:G1ReservePercent=20"
];

export const flags: Flags = {
    "aikars": {
        "generate": ({ memory }) => {
            return [
                ...baseAikar,
                ...(memory < 12 ? [
                    "-XX:G1NewSizePercent=30",
                    "-XX:G1MaxNewSizePercent=40",
                    "-XX:G1HeapRegionSize=8M",
                    "-XX:G1ReservePercent=20"
                ] : [
                    "-XX:G1NewSizePercent=40",
                    "-XX:G1MaxNewSizePercent=50",
                    "-XX:G1HeapRegionSize=16M",
                    "-XX:G1ReservePercent=15"
                ])
            ];
        }
    },
    "proxy": {
        "generate": () => {
            return [
                "-XX:+UseG1GC",
                "-XX:G1HeapRegionSize=4M",
                "-XX:+UnlockExperimentalVMOptions",
                "-XX:+ParallelRefProcEnabled",
                "-XX:+AlwaysPreTouch",
                "-XX:MaxInlineLevel=15"
            ];
        }
    },
    "none": {
        "generate": () => {
            return [];
        }
    }
};

export const extraFlags: ExtraFlags = {
    "vectors": {
        "supports": ["aikars"],
        "generate": ({ existingFlags }) => {
            return [
                ...existingFlags,
                "--add-modules=jdk.incubator.vector"
            ];
        }
    }
};
