import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

export const RouterHead = component$(() => {
    const head = useDocumentHead();
    const loc = useLocation();

    return (
        <>
            <title>{head.title}</title>
            <link rel="canonical" href={loc.href} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            {head.meta.map(m => (
                <meta {...m} />
            ))}
            {head.links.map(l => (
                <link {...l} />
            ))}
            {head.styles.map(s => (
                // eslint-disable-next-line react/no-danger
                <style {...s.props} dangerouslySetInnerHTML={s.style} />
            ))}
        </>
    );
});
