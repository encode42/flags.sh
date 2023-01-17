import { component$ } from "@builder.io/qwik";
import { $translate as t, useSpeakContext } from "qwik-speak";

export const ChangeLocale = component$(() => {
    const ctx = useSpeakContext();

    return (
        <label>
            <p>{t("app.changeLocale")}</p>
            <select onChange$={async event => {
                await fetch("/api/v1/lang", {
                    "method": "put",
                    "body": event.target.value
                });

                window.location.reload();
            }}>
                {ctx.config.supportedLocales.map(locale => (
                    <option key={locale.lang} value={locale.lang}>{locale.lang}</option>
                ))}
            </select>
        </label>
    );
});
