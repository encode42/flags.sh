/**
 * Options for the disabled components.
 */
export interface DisabledOptions {
    /**
     * Whether to disable the GUI toggle.
     */
    "gui"?: boolean,

    /**
     * Whether to disable the auto-restart toggle.
     */
    "autoRestart"?: boolean,

    /**
     * Whether to disable the Pterodactyl toggle.
     */
    "pterodactyl"?: boolean,

    /**
     * Whether to disable the incubating vectors toggle.
     */
    "modernVectors"?: boolean,

    /**
     * Whether to disable the download button.
     */
    "download"?: boolean
};
