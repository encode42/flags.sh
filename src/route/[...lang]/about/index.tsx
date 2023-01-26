import { component$ } from "@builder.io/qwik";
import { Speak, $translate as t } from "qwik-speak";

export default component$(() => {
    const keys = ["meta", "usage", "support", "contribute", "translate"];

    return (
        <Speak assets={["about"]}>
            <div>
                {keys.map(key => (
                    <div key={key}>
                        <h1>{t(`about.${key}.label`)}</h1>
                        <p>{t(`about.${key}.description`)}</p>
                    </div>
                ))}
            </div>
        </Speak>
    );
});
