import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikSpeakInline } from "qwik-speak/inline";
import tsconfigPaths from "vite-tsconfig-paths";
import supportedLocales from "./src/generated/supportedLocales.json";

export default defineConfig(() => {
    return {
        "plugins": [
            qwikCity({
                "routesDir": "src/route",
                "trailingSlash": false
            }),
            qwikVite(),
            qwikSpeakInline({
                "supportedLangs": supportedLocales,
                "defaultLang": "en",
                "splitChunks": true
            }),
            tsconfigPaths()
        ],
        "clearScreen": false,
        "preview": {
            "headers": {
                "Cache-Control": "public, max-age=600"
            }
        }
    };
});
