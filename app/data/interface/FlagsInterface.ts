interface ResultOptions extends PrefixOptions, SuffixOptions {};

interface PrefixOptions {
    "memory": number,
    "modernJava": boolean,
}

interface SuffixOptions {
    "filename": string,
    "gui": boolean
}

export default interface FlagsInterface {
    "types": {
        [key: string]: {
            "result": ({ memory, filename, gui, modernJava }: ResultOptions) => string
        }
    },
    "prefix": ({ memory, modernJava }: PrefixOptions) => string,
    "suffix": ({ filename, gui }: SuffixOptions) => string
};
