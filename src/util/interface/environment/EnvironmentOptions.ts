import type { EnvironmentOption } from "~/util/interface/environment/EnvironmentOption";

export interface EnvironmentOptions<OptionType = EnvironmentOption> {
    readonly [key: string]: OptionType
}
