import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import type { ColorSchemes } from "~/util/interface/color-schemes/type";
import { component$, Slot } from "@builder.io/qwik";
import { loader$ } from "@builder.io/qwik-city";
import { config } from "~/speak-config";
import { ColorScheme } from "~/context/color-scheme/wrapper";
import supportedLocales from "~/generated/supportedLocales.json";

export const onRequest: RequestHandler = ({ url, headers, locale, cookie, params, redirect }) => {
    // If language is explicitly set
    const langCookie = cookie.get("lang");

    let lang: string | undefined = params.lang || langCookie?.value;
    if (!lang) {
        // Get the client's accepted languages
        const acceptLanguage = headers.get("accept-language");
        if (acceptLanguage) {
            // Get the first accepted language
            lang = acceptLanguage.split(";")[0]?.split(",")[0];

            // Language code might be stored as _ instead of -
            if (!supportedLocales.includes(lang) && lang.includes("-")) {
                lang = acceptLanguage.replace("-", "_");

                // Get the broad accepted language
                if (!supportedLocales.includes(lang)) {
                    lang = acceptLanguage.split("-")[0];
                }
            }
        }
    }

    // Language could not be found
    if (!lang || !supportedLocales.includes(lang)) {
        lang = config.defaultLocale.lang;
    }

    // Redirect to SSG pages
    if (lang !== config.defaultLocale.lang && lang !== params.lang) {
        throw redirect(302, `/${lang}${url.pathname}`);
    }

    locale(lang);
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
