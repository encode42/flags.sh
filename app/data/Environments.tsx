import { ReactElement } from "react";
import { BrandDebian, BrandWindows, Terminal } from "tabler-icons-react";
import { stripIndent } from "common-tags";
import { DisabledOptions } from "./interface/DisabledOptions";

/**
 * The header used in Linux scripts/
 */
const linuxHeader = "#!/bin/bash";

/**
 * Options for the environment results.
 */
interface ResultOptions {
    "flags": string,
    "autoRestart": boolean
};

/**
 * Options for the component requires and excludes toggle.
 */
interface RequiresOptions {
    [key: string]: {
        /**
         * Whether to exclude this key if any of these toggles are enabled.
         */
        "excludes": string[]
    }
};

/**
 * An environment type.
 */
export interface EnvironmentType {
    /**
     * The name of the exported file.
     */
    "file"?: string,

    /**
     * The label to use in the environment tab.
     */
    "label": string,

    /**
     * The icon to use in the environment tab.
     */
    "icon": ReactElement,

    /**
     * The function used to get the results.
     */
    "result": ({ flags, autoRestart }: ResultOptions) => string,

    /**
     * Options for the disabled components.
     */
    "disabled": DisabledOptions,

    /**
     * Options for the component requires and excludes toggle.
     */
    "requires"?: RequiresOptions
}

/**
 * Interface for the Environments object.
 */
export interface EnvironmentsInterface {
    /**
     * The default environment.
     */
    "default": EnvironmentType,

    /**
     * Environment types.
     */
    "types": {
        [key: string]: EnvironmentType
    }
}

/**
 * The environments that are available to the app.
 */
export const Environments: EnvironmentsInterface = {
    get "default"() {
        return this.types.linux;
    },
    "types": {
        "linux": {
            "label": "Linux / Mac",
            "icon": <BrandDebian />,
            "file": "start.sh",
            "result": ({ flags, autoRestart }) => {
                return stripIndent(!autoRestart ? `
                    ${linuxHeader}

                    ${flags}
                `: `
                    ${linuxHeader}
                    
                    while [ true ]; do
                        ${flags}
                    
                        echo Server restarting...
                        echo Press CTRL + C to stop.
                    done
                `);
            },
            "disabled": {
                "pterodactyl": true
            }
        },
        "windows": {
            "label": "Windows",
            "icon": <BrandWindows />,
            "file": "start.bat",
            "result": ({ flags, autoRestart }) => {
                return stripIndent(!autoRestart ? `
                    ${flags}
                ` : `
                    :start
                    ${flags}
                    
                    echo Server restarting...
                    echo Press CTRL + C to stop.
                    goto :start
                `);
            },
            "disabled": {
                "pterodactyl": true
            }
        },
        "java": {
            "label": "Java",
            "icon": <Terminal />,
            "result": ({ flags }) => {
                return flags;
            },
            "disabled": {
                "pterodactyl": false,
                "autoRestart": true,
                "download": true
            },
            "requires": {
                "gui": {
                    "excludes": ["pterodactyl"]
                }
            }
        }
    }
};
