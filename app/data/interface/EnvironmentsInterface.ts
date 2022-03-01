interface ResultOptions {
    "flags": string,
    "autoRestart": boolean
};

interface DisabledOptions {
    "gui"?: boolean,
    "autoRestart"?: boolean,
    "pterodactyl"?: boolean,
    "modernJava"?: boolean
    "download"?: boolean
};

interface RequiresOptions {
    [key: string]: {
        "excludes": string[]
    }
};

export interface EnvironmentsTypeInterface {
    "file"?: string,
    "result": ({ flags, autoRestart }: ResultOptions) => string,
    "disabled": DisabledOptions,
    "requires"?: RequiresOptions
};

export default interface EnvironmentsInterface {
    "types": {
        [key: string]: EnvironmentsTypeInterface
    }
};
