import { component$ } from "@builder.io/qwik";
import { $translate as t, useSpeakContext } from "qwik-speak";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { config } from "~/speak-config";

export const ChangeLocale = component$(() => {
    const location = useLocation();
    const navigate = useNavigate();

    const ctx = useSpeakContext();

    return (
        <label>
            <p>{t("app.changeLocale")}</p>
            <select onChange$={async event => {
                await fetch("/api/v1/lang", {
                    "method": "put",
                    "body": event.target.value
                });

                let pathname = location.pathname;
                if (location.params.lang) {
                    pathname = pathname.replace(location.params.lang, event.target.value);
                }

                await navigate(pathname);
            }}>
                {ctx.config.supportedLocales.map(locale => (
                    <option key={locale.lang} value={locale.lang} selected={locale.lang === ctx.locale.lang}>{locale.lang}</option>
                ))}
            </select>
        </label>
    );
});
