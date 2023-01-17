import type { ColorSchemes } from "~/util/interface/color-schemes/type";
import type { RequestHandler } from "@builder.io/qwik-city";
import { colorSchemes } from "~/util/interface/color-schemes/array";

export const onPut: RequestHandler = async ({ cookie, request, send, status }) => {
    const data = await request.text() as ColorSchemes;

    if (!colorSchemes.includes(data)) {
        status(400);

        return;
    }

    if (!data || data === "system") {
        cookie.delete("colorScheme", {
            "path": "/"
        });
    } else {
        cookie.set("colorScheme", data, {
            "path": "/",
            "httpOnly": true,
            "sameSite": "strict"
        });
    }

    send(200, "");
};
