import type { EnvironmentOption } from "~/util/interface/environment/EnvironmentOption";
import type { AvailableConfig } from "~/data/config";
import type { GenerateOperatingSystem } from "~/util/interface/generate/GenerateOperatingSystem";

interface File {
    "name"?: string,
    "mime": string,
    "extension": string
}

export interface OperatingSystemOption extends EnvironmentOption {
    "file": File | false,
    "generate": GenerateOperatingSystem<AvailableConfig | "existingFlags">
}
