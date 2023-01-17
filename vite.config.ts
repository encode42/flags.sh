import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikSpeakInline } from "qwik-speak/inline";
import tsconfigPaths from "vite-tsconfig-paths";
import { getSupportedLangs } from "./src/util/getSupportedLangs";

const supportedLangs = getSupportedLangs();

export default defineConfig(() => {
    return {
        "plugins": [
            qwikCity({
                "routesDir": "src/route",
                "trailingSlash": false
            }),
            qwikVite(),
            qwikSpeakInline({
                "supportedLangs": supportedLangs,
                "defaultLang": "en-US",
                "splitChunks": true
            }),
            tsconfigPaths()
        ],
        "preview": {
            "headers": {
                "Cache-Control": "public, max-age=600"
            }
        }
    };
});
