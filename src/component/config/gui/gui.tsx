import type { SharedInputConfigProps } from "~/component/config/config/config";
import { component$ } from "@builder.io/qwik";
import { $translate as t } from "qwik-speak";
import { Config } from "~/component/config/config/config";

export const Gui = component$(({ value, onChange, ...other }: SharedInputConfigProps) => {
    return (
        <Config label={t("panel.gui.label")} description={t("panel.gui.description")} {...other}>
            <input type="checkbox" spellcheck={false} checked={value} onChange$={onChange}/>
        </Config>
    );
});
