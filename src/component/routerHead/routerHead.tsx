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
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            {head.meta.map(meta => (
                <meta key={meta.key} name={meta.name} content={meta.name === "description" && meta.content ? t(meta.content) : meta.content} />
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
