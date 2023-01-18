import type { SharedConfigProps } from "~/component/config/config/config";
import type { AvailableExtraFlags } from "~/data/flags";
import { component$ } from "@builder.io/qwik";
import { $translate as t } from "qwik-speak";
import { Config } from "~/component/config/config/config";

interface ExtraFlagsProps extends SharedConfigProps<HTMLSelectElement> {
    "value"?: AvailableExtraFlags[],
    "availableExtraFlags": AvailableExtraFlags[]
}

export const ExtraFlags = component$(({ value, availableExtraFlags, onChange$, ...other }: ExtraFlagsProps) => {
    return (
        <Config label={t("panel.extraFlags.label")} description={t("panel.extraFlags.description")} {...other}>
            <select multiple onChange$={onChange$}>
                {availableExtraFlags.map(availableExtraFlag => (
                    <option key={availableExtraFlag} value={availableExtraFlag} selected={value?.includes(availableExtraFlag)}>{t(`panel.extraFlags.${availableExtraFlag}.label`)}</option>
                ))}
            </select>
        </Config>
    );
});
