import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";
import { $translate as t } from "qwik-speak";

export const RouterHead = component$(() => {
    const head = useDocumentHead();
    const loc = useLocation();

    return (
        <>
            <title>{head.title}</title>
            <link rel="canonical" href={loc.href} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            {/* Favicon */}
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
            <link rel="shortcut icon" href="/favicon/favicon.ico" />
            <link rel="manifest" href="/favicon/site.webmanifest" />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
            <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#69db7c" />
            <meta name="msapplication-TileColor" content="#00a300" />
            <meta name="theme-color" content="#69db7c" />

            {/* og tags */}
            <meta name="description" content={t("description")} />
            <meta property="og:url" content="https://flags-sh.pages.dev/asset/logo.png" />
            <meta property="og:image" content="https://flags-sh.pages.dev/asset/logo.png" />
            <meta name="twitter:card" content="summary" />

            {head.meta.map(meta => (
                <meta key={meta.key} name={meta.name} content={meta.content} />
            ))}
            {head.links.map(link => (
                <link key={link.key} {...link} />
            ))}
            {head.styles.map(stype => (
                // eslint-disable-next-line react/no-danger
                <style key={stype.key} {...stype.props} dangerouslySetInnerHTML={stype.style} />
            ))}
        </>
    );
});
