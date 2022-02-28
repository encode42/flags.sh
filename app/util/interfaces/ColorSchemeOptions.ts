import { Tuple } from "@mantine/core";

export interface ColorObject {
    "index": number,
    "hex": string
}

export interface DefaultColorScheme {
    "name": string,
    "colors": Tuple<string, 10>
}

export default interface ColorSchemeOptions {
    "name": string,
    "colors"?: ColorObject | ColorObject[],
    "default"?: string | string[]
}
