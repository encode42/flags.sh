import { component$ } from "@builder.io/qwik";
import Layout from "~/route/[...lang]/layout";
import { Speak } from "qwik-speak";

export default component$(() => {
    return (
        <Speak assets={["panel"]}> {/* TODO */}
            <Layout>
                <p>Hello World</p>
            </Layout>
        </Speak>
    );
});
