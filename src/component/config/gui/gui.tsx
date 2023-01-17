import type { SharedConfigProps } from "~/component/config/config/config";
import { component$ } from "@builder.io/qwik";
import { $translate as t } from "qwik-speak";
import { Config } from "~/component/config/config/config";

export const Gui = component$(({ onChange$, ...other }: SharedConfigProps<HTMLInputElement>) => {
    return (
        <Config label={t("panel.gui.label")} description={t("panel.gui.description")} {...other}>
            <input type="checkbox" onChange$={onChange$} />
        </Config>
    );
});
