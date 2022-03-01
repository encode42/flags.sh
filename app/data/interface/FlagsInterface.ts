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
     * Whether to add flags for modern versions of Java.
     */
    "modernJava": boolean,
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
 * Interface for the Flags object.
 */
export default interface FlagsInterface {
    /**
     * Flag types.
     */
    "types": {
        [key: string]: {
            /**
             * The function used to get the results.
             */
            "result": ({ memory, filename, gui, modernJava }: ResultOptions) => string
        }
    },

    /**
     * Prefix of every flag type.
     */
    "prefix": ({ memory, modernJava }: PrefixOptions) => string,

    /**
     * Suffix of every flag type.
     */
    "suffix": ({ filename, gui }: SuffixOptions) => string
};
