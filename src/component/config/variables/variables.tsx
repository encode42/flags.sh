import type { SharedCheckboxConfigProps } from "~/component/config/config/config";
import { component$ } from "@builder.io/qwik";
import { $translate as t } from "qwik-speak";
import { Config } from "~/component/config/config/config";

export const Variables = component$(({ value, onChange$, ...other }: SharedCheckboxConfigProps) => {
    return (
        <Config label={t("panel.variables.label")} description={t("panel.variables.description")} {...other}>
            <input type="checkbox" value={value} onChange$={(event, other) => {
                onChange$(event, other, event.target.value === "on");
            }} />
        </Config>
    );
});
