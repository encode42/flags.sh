import type { SharedInputConfigProps } from "~/component/config/config/config";
import { component$, useSignal } from "@builder.io/qwik";
import { LabelDescription } from "~/component/label-description/label-description";
import { $translate as t } from "qwik-speak";
import { Warning } from "~/component/warning/warning";

export const Memory = component$(({ value, onChange, ...other }: SharedInputConfigProps) => {
    const newValue = useSignal(value);

    return (
        <>
            <LabelDescription label={t("panel.memory.label")} description={t("panel.memory.description")} {...other}>
                <div data-tip={`${newValue.value} GB`}>
                    <input type="range" spellcheck={false} min={2} max={16} step={1} value={value} onChange$={onChange} onInput$={event => {
                        newValue.value = Number.parseInt((event.target as HTMLInputElement).value);
                    }}/>
                </div>
            </LabelDescription>
            {newValue.value < 4 && <Warning>{t("panel.memory.warning.low")}</Warning>}
            {newValue.value > 12 && <Warning>{t("panel.memory.warning.high")}</Warning>}
        </>
    );
});
