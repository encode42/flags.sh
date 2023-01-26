import type { SharedConfigProps } from "~/component/config/config/config";
import type { AvailableFlags } from "~/data/flags";
import { component$ } from "@builder.io/qwik";
import { $translate as t } from "qwik-speak";
import { Config } from "~/component/config/config/config";

interface FlagsProps extends SharedConfigProps<HTMLSelectElement> {
    "value"?: AvailableFlags,
    "availableFlags": AvailableFlags[]
}

export const Flags = component$(({ value, availableFlags, onChange, ...other }: FlagsProps) => {
    return (
        <Config label={t("panel.flags.label")} description={t("panel.flags.description")} {...other}>
            <select onChange$={onChange}>
                {availableFlags.map(availableFlag => (
                    <option key={availableFlag} value={availableFlag} selected={availableFlag === value}>{t(`panel.flags.${availableFlag}.label`)}</option>
                ))}
            </select>
        </Config>
    );
});
