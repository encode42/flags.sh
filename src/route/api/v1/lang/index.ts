import type { RequestHandler } from "@builder.io/qwik-city";

export const onPut: RequestHandler = async ({ request, cookie, send }) => {
    const data = await request.text();

    cookie.set("lang", data, {
        "path": "/",
        "httpOnly": true,
        "sameSite": "strict"
    });

    send(200, "");
};
