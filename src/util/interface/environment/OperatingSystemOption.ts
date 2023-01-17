import type { EnvironmentOption } from "~/util/interface/environment/EnvironmentOption";
import type { AvailableConfig } from "~/data/config";
import type { GenerateOperatingSystem } from "~/util/interface/generate/GenerateOperatingSystem";

export interface OperatingSystemOption extends EnvironmentOption {
    "generate": GenerateOperatingSystem<AvailableConfig | "existingFlags">
}
