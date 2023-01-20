import type { AvailableConfig } from "~/data/config";

export interface EnvironmentOption {
    "icon": any, // todo: when tabler icons works with qwik
    "config": AvailableConfig[]
}
