import type { RequestHandler } from "@builder.io/qwik-city";
import type { ColorSchemes } from "~/util/interface/color-schemes/type";
import { component$, Slot } from "@builder.io/qwik";
import { loader$ } from "@builder.io/qwik-city";
import { config } from "~/speak-config";
import { ColorScheme } from "~/context/color-scheme/wrapper";
import supportedLocales from "~/generated/supportedLocales.json";

export const onRequest: RequestHandler = ({ url, request, locale, cookie, params, redirect }) => {
    let lang: string | undefined;

    // Language provided by URL
    const paramLang = params.lang?.replace(/^\/|\/$/g, "");
    if (paramLang && supportedLocales.includes(paramLang)) {
        lang = paramLang;
    }

    if (!lang) {
        // Language provided by cookie
        const langCookie = cookie.get("lang");
        if (langCookie && supportedLocales.includes(langCookie?.value)) {
            lang = langCookie?.value;
        }

        if (!lang || !supportedLocales.includes(lang)) {
            // Language provided by Accept-Language header
            const acceptLanguageHeader = request.headers.get("accept-language");
            if (acceptLanguageHeader) {
                const acceptedLanguages: string[] = [];

                // Get all accept language codes
                for (const section of acceptLanguageHeader.split(";")) {
                    for (const pair of section.split(",")) {
                        // Ignore weight (typically sorted correctly by client)
                        if (pair.startsWith("q")) {
                            continue;
                        }

                        acceptedLanguages.push(pair);
                    }
                }

                // Find the first supported language
                for (const language of acceptedLanguages) {
                    // Exact match
                    if (supportedLocales.includes(language)) {
                        lang = language;
                        break;
                    }

                    if (language.includes("-")) {
                        // Check if stored language uses underscores instead of dashes
                        const underscoreReplacement = language.replace("-", "_");
                        if (supportedLocales.includes(underscoreReplacement)) {
                            lang = underscoreReplacement;
                        }

                        // Check if stored language does not have a subset
                        const broad = language.split("-")[0];
                        if (supportedLocales.includes(broad)) {
                            lang = broad;
                            break;
                        }
                    }
                }
            }
        }
    }

    // Resort to default language
    if (!lang || !supportedLocales.includes(lang)) {
        lang = config.defaultLocale.lang;
    }

    // Redirect to the language's SSG pages
    if (!paramLang) {
        throw redirect(302, `/${lang}${url.pathname}`);
    }

    if (paramLang && paramLang !== lang) {
        throw redirect(301, `${url.pathname.replace(paramLang, lang)}`);
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
