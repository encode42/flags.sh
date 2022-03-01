import { stripIndent } from "common-tags";
import EnvironmentsInterface from "./interface/EnvironmentsInterface";

const linuxHeader = "#!/bin/bash";

export const Environments: EnvironmentsInterface = {
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
            "disabled": {
                "gui": false,
                "autoRestart": false,
                "pterodactyl": true,
                "modernJava": false,
                "download": false
            }
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
            "disabled": {
                "gui": false,
                "autoRestart": false,
                "pterodactyl": true,
                "modernJava": false,
                "download": false
            }
        },
        "java": {
            "result": ({ flags }) => {
                return flags;
            },
            "disabled": {
                "gui": false,
                "autoRestart": true,
                "pterodactyl": false,
                "modernJava": false,
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
