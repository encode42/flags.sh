import type { SharedConfigProps } from "~/component/config/config/config";
import { component$ } from "@builder.io/qwik";
import { $translate as t } from "qwik-speak";
import { Config } from "~/component/config/config/config";

export const FileName = component$(({ onChange$, ...other }: SharedConfigProps<HTMLInputElement>) => {
    return (
        <Config label={t("panel.fileName.label")} description={t("panel.fileName.description")} {...other}>
            <input type="text" onChange$={onChange$} />
        </Config>
    );
});
