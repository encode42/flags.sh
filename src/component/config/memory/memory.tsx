import type { SharedInputConfigProps } from "~/component/config/config/config";
import { component$ } from "@builder.io/qwik";
import { LabelDescription } from "~/component/label-description/label-description";
import { $translate as t } from "qwik-speak";

export const Memory = component$(({ value, onChange$, ...other }: SharedInputConfigProps) => {
    return (
        <LabelDescription label={t("panel.memory.label")} description={t("panel.memory.description")} {...other}>
            <div class="tooltip" data-tip={`${value} GB`}>
                <input type="range" className="range" min={2} max={16} step={1} value={value} onChange$={onChange$} />
            </div>
        </LabelDescription>
    );
});
