import { component$ } from "@builder.io/qwik";
import { Speak, $translate as t } from "qwik-speak";
import { loader$ } from "@builder.io/qwik-city";

export const getShare = loader$<unknown, Promise<string>>(async ({ params, redirect, platform }) => {
    if (!params.share) {
        return redirect(400, "/");
    }

    if (platform.CLOUDFLARE_BUCKET) {
        const exists = await platform.CLOUDFLARE_BUCKET.get(params.share);

        if (!exists) {
            return redirect(400, "/");
        }

        const data = await exists.json();
        return data.result;
    }

    return "Development mode";
});

export default component$(() => {
    const share = getShare.use();

    return (
        <Speak assets={["share", "panel"]}>
            <div>
                <h1>{t("share.welcome.label")}</h1>
                <p>{t("share.welcome.description")}</p>
                <pre style={{"whiteSpace": "pre-line"}}>
                    <code>{share.value}</code>
                </pre>
            </div>
        </Speak>
    );
});
