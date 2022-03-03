import { stripIndent } from "common-tags";
import EnvironmentsInterface from "./interface/EnvironmentsInterface";
import { BrandDebian, BrandWindows, Terminal } from "tabler-icons-react";
import { DefaultDisabledOptions } from "./DefaultDisabledOptions";

/**
 * The header used in Linux scripts/
 */
const linuxHeader = "#!/bin/bash";

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
            "disabled": { ...DefaultDisabledOptions }
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
            "disabled": { ...DefaultDisabledOptions }
        },
        "java": {
            "label": "Java",
            "icon": <Terminal />,
            "result": ({ flags }) => {
                return flags;
            },
            "disabled": {
                ...DefaultDisabledOptions,
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
