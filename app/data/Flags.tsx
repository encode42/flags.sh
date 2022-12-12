import { DisabledOptions } from "./interface/DisabledOptions";

/**
 * Additional configuration for Aikar's flags.
 */
const aikarsFlags = {
    "base": "-XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true",
    "standard": "-XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20",
    "large": "-XX:G1NewSizePercent=40 -XX:G1MaxNewSizePercent=50 -XX:G1HeapRegionSize=16M -XX:G1ReservePercent=15"
};

/**
 * Options for the flag results.
 */
interface ResultOptions extends PrefixOptions, SuffixOptions {};

/**
 * Options for the flag prefix.
 */
interface PrefixOptions {
    /**
     * The amount of memory to allocate in gigabytes.
     */
    "memory": number,

    /**
     * Whether to recalculate memory and add flags for Pterodactyl's console.
     */
    "pterodactyl": boolean,

    /**
     * Whether to add incubating vector flags for modern versions of Java Hotspot.
     */
    "modernVectors": boolean,
}

/**
 * Options for the flag suffix.
 */
interface SuffixOptions {
    /**
     * Filename to start.
     */
    "filename": string,

    /**
     * Whether to enable the GUI.
     */
    "gui": boolean
}

/**
 * A flag type.
 */
export interface FlagType {
    /**
     * The key utilized in the flag selector.
     */
    "key": string,

    /**
     * The label to use in the flag selector.
     */
    "label": string,

    /**
     * The description to use in the flag selector.
     */
    "description"?: string,

    /**
     * The function used to get the results.
     */
    "result": ({ memory, filename, gui, modernVectors }: ResultOptions) => string,

    /**
     * Options for the disabled components.
     */
    "disabled"?: DisabledOptions
}

/**
 * Interface for the Flags object.
 */
export interface FlagsInterface {
    /**
     * The default flags.
     */
    "default": FlagType,

    /**
     * Flag types.
     */
    "types": {
        [key: string]: FlagType
    },

    /**
     * Prefix of every flag type.
     */
    "prefix": ({ memory, modernVectors }: PrefixOptions) => string,

    /**
     * Suffix of every flag type.
     */
    "suffix": ({ filename, gui }: SuffixOptions) => string
}

/**
 * The flags that are available to the app.
 */
export const Flags: FlagsInterface = {
    get "default"() {
        return this.types.aikars;
    },
    "types": {
        "none": {
            "key": "none",
            "label": "None",
            "result": ({ memory, filename, gui, pterodactyl, modernVectors }) => {
                return `${Flags.prefix({ memory, pterodactyl, modernVectors })} ${Flags.suffix({ filename, gui })}`;
            }
        },
        "aikars": {
            "key": "aikars",
            "label": "Aikar's Flags",
            "description": "The high-performance and recommended flags.",
            "result": ({ memory, filename, gui, pterodactyl, modernVectors }) => {
                const base = `${aikarsFlags.base} ${memory >= 12 ? aikarsFlags.large : aikarsFlags.standard}`;
                return `${Flags.prefix({ memory, pterodactyl, modernVectors })} ${base} ${Flags.suffix({ filename, gui })}`;
            }
        },
        "velocity": {
            "key": "velocity",
            "label": "Velocity & Waterfall/Bungeecord",
            "description": "Flags that work best with proxy software.",
            "result": ({ memory, filename, gui, pterodactyl, modernVectors }) => {
                const base = "-XX:+UseG1GC -XX:G1HeapRegionSize=4M -XX:+UnlockExperimentalVMOptions -XX:+ParallelRefProcEnabled -XX:+AlwaysPreTouch -XX:MaxInlineLevel=15";
                return `${Flags.prefix({ memory, pterodactyl, modernVectors })} ${base} ${Flags.suffix({ filename, gui })}`;
            },
            "disabled": {
                "gui": true,
                "modernVectors": true
            }
        }
    },
    "prefix": ({ memory, pterodactyl, modernVectors }) => {
        const displayMemory = `${(memory * 1024)?.toFixed(0)}M`;
        let base = `java -Xms${displayMemory} -Xmx${displayMemory}`;

        // Pterodactyl flags
        if (pterodactyl) {
            base += " -Dterminal.jline=false -Dterminal.ansi=true";
        }

        // SIMD vectors
        if (modernVectors) {
            base += " --add-modules=jdk.incubator.vector";
        }

        return base;
    },
    "suffix": ({ filename, gui }) => {
        return `-jar ${filename} ${!gui ? "--nogui" : ""}`.trim();
    }
};
