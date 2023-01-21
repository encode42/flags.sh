import type { EnvironmentOptions } from "~/util/interface/environment/EnvironmentOptions";
import type { AvailableConfig } from "~/data/config";
import type { OperatingSystemOption } from "~/util/interface/environment/OperatingSystemOption";

export type AvailableOperatingSystem = keyof typeof operatingSystem;

const sharedConfig: AvailableConfig[] = [
    "fileName",
    "flags",
    "extraFlags",
    "memory"
];

const sharedScriptConfig: AvailableConfig[] = [
    "gui",
    "autoRestart",
    "variables"
];

function getMemory(memory: number, isContainer = false) {
    const binaryMemory = memory * 1024;

    if (!isContainer) {
        return binaryMemory;
    }

    return Math.round(binaryMemory * 0.85);
}

function getJava(config: Record<AvailableConfig | "existingFlags", any>): string {
    const base = [
        "java",
        `-Xms${config.memory}M`,
        `-Xmx${config.memory}M`,
        ...config.existingFlags,
        "-jar",
        config.fileName,
    ];

    // GUI variable is supported
    if ("gui" in config && !config.gui) {
        base.push("--nogui");
    }

    return base.join(" ");
}

export const operatingSystem: EnvironmentOptions<OperatingSystemOption> = {
    "linux": {
        "icon": "IconBrandDebian",
        "file": {
            "name": "Bash Script",
            "mime": "text/plain",
            "extension": ".sh"
        },
        "config": [
            ...sharedConfig,
            ...sharedScriptConfig
        ],
        "generate": config => {
            const base = [
                "#!/bin/bash",
                ""
            ];

            let fileName = config.fileName;
            let memory: number | string = getMemory(config.memory);

            if (config.variables) {
                base.push(
                    `fileName="${fileName}"`,
                    `memory=${memory}`,
                    "",
                    "declare -i memory",
                    ""
                );

                fileName = "\"$fileName\"";
                memory = "\"$memory\"";
            }

            const java = getJava({
                ...config,
                fileName,
                memory
            });

            if (config.autoRestart) {
                base.push(
                    "while true; do",
                    java, // todo: tab
                    "",
                    "echo Restarting in 5 seconds...",
                    "echo Press CTRL + C to cancel.",
                    "sleep 5",
                    "done"
                );
            } else {
                base.push(java);
            }

            return {
                "result": base.join("\n"),
                "flags": config.existingFlags
            };
        }
    },
    "windows": {
        "icon": "IconBrandWindows",
        "file": {
            "name": "Batch Script",
            "mime": "text/plain",
            "extension": ".bat"
        },
        "config": [
            ...sharedConfig,
            ...sharedScriptConfig
        ],
        "generate": config => {
            const base = [];

            let fileName = config.fileName;
            let memory: number | string = getMemory(config.memory);

            if (config.variables) {
                base.push(
                    `set fileName="${fileName}"`,
                    `set /A memory=${memory}`,
                    ""
                );

                fileName = "%fileName%";
                memory = "%memory%";
            }

            const java = getJava({
                ...config,
                fileName,
                memory
            });

            if (config.autoRestart) {
                base.push(
                    ":start",
                    java,
                    "",
                    "echo Restarting in 5 seconds...",
                    "echo Press CTRL + C to cancel.",
                    "timeout 5",
                    "goto :start"
                );
            } else {
                base.push(java);
            }

            return {
                "result": base.join("\n"),
                "flags": config.existingFlags
            };
        }
    },
    "pterodactyl": {
        "icon": "IconServer",
        "file": false,
        "config": [
            ...sharedConfig,
            "variables"
        ],
        "generate": config => {
            const base = [];

            let fileName = config.fileName;
            let memory: number | string = getMemory(config.memory, true);

            if (config.variables) {
                fileName = "{{SERVER_JARFILE}}";
                memory = "({{SERVER_MEMORY}}*85/100)";
            }

            const flags = [
                ...config.existingFlags,
                "-Dterminal.jline=false",
                "-Dterminal.ansi=true"
            ];

            const java = getJava({
                ...config,
                "existingFlags": flags,
                fileName,
                memory
            });

            base.push(java);

            return {
                "result": base.join("\n"),
                flags
            };
        }
    },
    "command": {
        "icon": "IconTerminal",
        "file": false,
        "config": [
            ...sharedConfig,
        ],
        "generate": config => {
            const base = [];

            const java = getJava({
                ...config,
                "memory": getMemory(config.memory)
            });

            base.push(java);

            return {
                "result": base.join("\n"),
                "flags": config.existingFlags
            };
        }
    }
};

export const defaultOperatingSystem: AvailableOperatingSystem = "linux";
