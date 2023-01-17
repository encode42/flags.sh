import { renderToStream, RenderToStreamOptions } from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";
import Root from "./root";

export default function (opts: RenderToStreamOptions) {
    return renderToStream(<Root />, {
        manifest,
        ...opts,
        "containerAttributes": {
            "lang": "en-us",
            ...opts.containerAttributes,
        },
        "prefetchStrategy": {
            "implementation": {
                "linkInsert": "html-append",
                "prefetchEvent": "always",
            },
        },
    });
}
