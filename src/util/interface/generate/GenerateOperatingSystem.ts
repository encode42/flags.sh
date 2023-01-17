import type { Generate } from "~/util/interface/generate/Generate";

export interface GenerateOperatingSystemResult {
    "result": string,
    "flags": string[]
}

export type GenerateOperatingSystem<T extends string | number> = Generate<T, GenerateOperatingSystemResult>;
