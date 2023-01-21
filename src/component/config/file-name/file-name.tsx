import type { SharedInputConfigProps } from "~/component/config/config/config";
import { component$ } from "@builder.io/qwik";
import { $translate as t } from "qwik-speak";
import { Config } from "~/component/config/config/config";

export const FileName = component$(({ value, onChange$, ...other }: SharedInputConfigProps) => {
    return (
        <Config label={t("panel.fileName.label")} description={t("panel.fileName.description")} {...other}>
            <input type="text" value={value} onChange$={onChange$} />
        </Config>
    );
});
