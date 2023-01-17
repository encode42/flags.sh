import type { SharedConfigProps } from "~/component/config/config/config";
import { component$ } from "@builder.io/qwik";
import { $translate as t } from "qwik-speak";
import { Config } from "~/component/config/config/config";

export const AutoRestart = component$(({ onChange$, ...other }: SharedConfigProps<HTMLInputElement>) => {
    return (
        <Config label={t("panel.autoRestart.label")} description={t("panel.autoRestart.description")} {...other}>
            <input type="checkbox" onChange$={onChange$} />
        </Config>
    );
});
