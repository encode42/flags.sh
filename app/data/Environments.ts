import { stripIndent } from "common-tags";
import EnvironmentsInterface, { DisabledOptions } from "./interface/EnvironmentsInterface";

/**
 * The header used in Linux scripts/
 */
const linuxHeader = "#!/bin/bash";

const defaultDisabledOptions: DisabledOptions = {
    "autoRestart": false,
    "download": false,
    "gui": false,
    "modernJava": false,
    "pterodactyl": true
};

/**
 * The environments that are available to the app.
 */
export const Environments: EnvironmentsInterface = {
    get "default"() {
        return this.types.linux;
    },
    "types": {
        "linux": {
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
            "disabled": { ...defaultDisabledOptions }
        },
        "windows": {
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
            "disabled": { ...defaultDisabledOptions }
        },
        "java": {
            "result": ({ flags }) => {
                return flags;
            },
            "disabled": {
                ...defaultDisabledOptions,
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
