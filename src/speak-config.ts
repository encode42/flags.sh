import { $ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { LoadTranslationFn, SpeakConfig, TranslationFn } from "qwik-speak";
import supportedLocales from "~/generated/supportedLocales.json";

export const config: SpeakConfig = {
    "defaultLocale": {
        "lang": "en-US"
    },
    "supportedLocales": supportedLocales.map(locale => ({
        "lang": locale
    })),
    "assets": [
        "app",
        "runtime"
    ]
};

export const loadTranslation$: LoadTranslationFn = $(async (lang: string, asset: string, origin?: string) => {
    if (import.meta.env.DEV || asset === "runtime") {
        let url = "";
        if (isServer && origin) {
            url = origin;
        }
        url += `/i18n/${lang}/${asset}.json`;

        const data = await fetch(url);
        return data.json();
    }
});

export const translationFn: TranslationFn = {
    "loadTranslation$": loadTranslation$
};
