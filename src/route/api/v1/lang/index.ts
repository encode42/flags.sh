import type { RequestHandler } from "@builder.io/qwik-city";
import { config } from "~/speak-config";

export const onPut: RequestHandler = async ({ request, cookie, send }) => {
    const data = await request.text();

    if (data === config.defaultLocale.lang) {
        cookie.delete("lang", {
            "path": "/"
        });
    } else {
        cookie.set("lang", data, {
            "path": "/",
            "httpOnly": true,
            "sameSite": "strict"
        });
    }

    send(200, "");
};
