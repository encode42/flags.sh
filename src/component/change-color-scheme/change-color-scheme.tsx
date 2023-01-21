import { component$ } from "@builder.io/qwik";
import { useColorScheme } from "~/context/color-scheme/use";
import { colorSchemes } from "~/util/interface/color-schemes/array";
import { $translate as t } from "qwik-speak";

export const ChangeColorScheme = component$(() => {
    const userColorScheme = useColorScheme();

    return (
        <label>
            {t("app.colorScheme.label")}
            <select onChange$={async event => {
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
        </label>
    );
});
