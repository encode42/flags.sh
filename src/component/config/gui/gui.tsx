import type { SharedCheckboxConfigProps } from "~/component/config/config/config";
import { component$ } from "@builder.io/qwik";
import { $translate as t } from "qwik-speak";
import { Config } from "~/component/config/config/config";

export const Gui = component$(({ value, onChange$, ...other }: SharedCheckboxConfigProps) => {
    return (
        <Config label={t("panel.gui.label")} description={t("panel.gui.description")} {...other}>
            <input type="checkbox" value={value} onChange$={(event, other) => {
                onChange$(event, other, event.target.value === "on");
            }} />
        </Config>
    );
});
