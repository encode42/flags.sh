import { component$ } from "@builder.io/qwik";
import { useColorScheme } from "~/context/color-scheme/use";
import { colorSchemes } from "~/util/interface/color-schemes/array";
import { $translate as t } from "qwik-speak";

export const ChangeColorScheme = component$(() => {
    const userColorScheme = useColorScheme();

    return (
        <div class="form-control">
            <label class="label">
                <span class="label-text">{t("app.colorScheme.label")}</span>
            </label>
            <select class="select select-bordered" onChange$={async event => {
                await fetch("/api/v1/colorScheme", {
                    "method": "put",
                    "body": event.target.value
                });

                window.location.reload();
            }}>
                {colorSchemes.map(colorScheme => (
                    <option key={colorScheme} value={colorScheme} selected={colorScheme === userColorScheme}>{t(`app.colorScheme.${colorScheme}`)}</option>
                ))}
            </select>
        </div>
    );
});
