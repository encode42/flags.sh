/**
 * Options for the environment results.
 */
import { ReactElement } from "react";
import { DisabledOptions } from "./DisabledOptions";

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
