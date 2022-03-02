/**
 * Options for the environment results.
 */
interface ResultOptions {
    "flags": string,
    "autoRestart": boolean
};

/**
 * Options for the disabled components.
 */
export interface DisabledOptions {
    /**
     * Whether to disable the GUI toggle.
     */
    "gui": boolean,

    /**
     * Whether to disable the auto-restart toggle.
     */
    "autoRestart": boolean,

    /**
     * Whether to disable the Pterodactyl toggle.
     */
    "pterodactyl": boolean,

    /**
     * Whether to disable the modern Java toggle.
     */
    "modernJava": boolean,

    /**
     * Whether to disable the download button.
     */
    "download": boolean
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
};

/**
 * Interface for the Environments object.
 */
export default interface EnvironmentsInterface {
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
};
