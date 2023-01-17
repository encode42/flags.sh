import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import type { ColorSchemes } from "~/util/interface/color-schemes/type";
import { component$, Slot } from "@builder.io/qwik";
import { loader$ } from "@builder.io/qwik-city";
import { config } from "~/speak-config";
import { ColorScheme } from "~/context/color-scheme/wrapper";

export const onRequest: RequestHandler = ({ headers, locale, cookie }) => {
    const langCookie = cookie.get("lang");

    let lang: string | undefined = langCookie?.value;
    if (!lang) {
        const acceptLanguage = headers.get("accept-language");

        if (acceptLanguage) {
            lang = acceptLanguage.split(";")[0]?.split(",")[0];
        }
    }

    locale(lang ?? config.defaultLocale.lang);
};

export const getColorScheme = loader$<unknown, ColorSchemes | undefined>(({ cookie }) => {
    const colorSchemeCookie = cookie.get("colorScheme");

    return colorSchemeCookie?.value as ColorSchemes | undefined;
});

export default component$(() => {
    const colorScheme = getColorScheme.use();

    return (
        <ColorScheme colorScheme={colorScheme.value}>
            <Slot />
        </ColorScheme>
    );
});

export const head: DocumentHead = {
    "title": "flags.sh",
    "meta": [{
        "name": "description",
        "content": "flags.sh"
    }]
};
