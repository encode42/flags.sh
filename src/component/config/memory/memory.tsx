import type { SharedConfigProps } from "~/component/config/config/config";
import { component$ } from "@builder.io/qwik";
import { LabelDescription } from "~/component/label-description/label-description";
import { $translate as t } from "qwik-speak";

export const Memory = component$(({ onChange$, ...other }: SharedConfigProps<HTMLInputElement>) => {
    return (
        <LabelDescription label={t("panel.memory.label")} description={t("panel.memory.description")} {...other}>
            <input type="range" min={2} max={16} onChange$={onChange$} />
        </LabelDescription>
    );
});
