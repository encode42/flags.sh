import type { AvailableConfig } from "~/data/config";
import type { AvailableFlags, AvailableExtraFlags } from "~/data/flags";
import { component$, Resource, useResource$, useStore, useTask$ } from "@builder.io/qwik";
import { defaultOperatingSystem, operatingSystem } from "~/data/environment/operatingSystem";
import { defaultServerType, serverType } from "~/data/environment/serverType";
import { config } from "~/data/config";
import { $translate as t, Speak } from "qwik-speak";
import { ChangeLocale } from "~/component/change-locale/change-locale";
import { ChangeColorScheme } from "~/component/change-color-scheme/change-color-scheme";
import Layout from "~/route/[...lang]/layout";
import { FileName } from "~/component/config/file-name/file-name";
import { Flags } from "~/component/config/flags/flags";
import { Memory } from "~/component/config/memory/memory";
import { Gui } from "~/component/config/gui/gui";
import { AutoRestart } from "~/component/config/auto-restart/auto-restart";
import { ExtraFlags } from "~/component/config/extra-flags/extra-flags";
import { Variables } from "~/component/config/variables/variables";
import { Config } from "~/component/config/config/config";
import { extraFlags, flags } from "~/data/flags";

interface State {
    "availableConfig": AvailableConfig[],
    "availableFlags": AvailableFlags[],
    "availableExtraFlags": AvailableExtraFlags[],
    "advanced": boolean
}

type SetConfigState = {
    [key in AvailableConfig]: any
}

export default component$(() => {
    const state = useStore<State>({
        "advanced": false,
        "availableConfig": [],
        "availableFlags": [],
        "availableExtraFlags": [],
        "generate": false // hacky workaround
    });

    const setConfig = useStore<SetConfigState>({
        "operatingSystem": defaultOperatingSystem,
        "serverType": defaultServerType
    });

    const generate = useResource$<string>(async ({ track, cleanup }) => {
        track(() => state.generate); // hacky workaround
        const selectedConfig = track(() => setConfig);

        const abortController = new AbortController();
        cleanup(() => {
            abortController.abort("cleanup");
        });

        const url = new URL("/api/v1/generate", "https://flags-sh.pages.dev"); // hacky workaround
        for (const [key, value] of Object.entries(selectedConfig)) {
            if (!state.availableConfig.includes(key) && key !== "operatingSystem" && key !== "serverType" && key !== "flags" && key !== "extraFlags") { // todo: mess
                continue;
            }

            url.searchParams.set(key, value);
        }

        const response = await fetch(url.href, {
            "signal": abortController.signal
        });

        const data = await response.json();

        return data.result;
    });

    useTask$(({ track }) => {
        const setOperatingSystem = track(() => setConfig.operatingSystem);
        const setServerType = track(() => setConfig.serverType);
        const setAdvanced = track(() => state.advanced);

        const selectedOperatingSystem = operatingSystem[setOperatingSystem];
        const selectedServerType = serverType[setServerType];

        const availableConfig: AvailableConfig[] = [];
        for (const [key, value] of Object.entries(config)) {
            if (!selectedOperatingSystem.config.includes(key) || !selectedServerType.config.includes(key)) {
                continue;
            }

            if (value.isAdvanced && !setAdvanced) {
                continue;
            }

            availableConfig.push(key);
        }

        const availableFlags: AvailableFlags[] = [];
        for (const [key, value] of Object.entries(flags)) {
            if (!selectedServerType.flags.includes(key)) {
                continue;
            }

            availableFlags.push(key);
        }

        state.availableConfig = availableConfig;
        state.availableFlags = availableFlags;
    });

    useTask$(({ track }) => {
        const flags = track(() => setConfig.flags);

        const availableExtraFlags: AvailableExtraFlags[] = [];
        for (const [key, value] of Object.entries(extraFlags)) {
            if (!value.supports.includes(flags)) {
                continue;
            }

            availableExtraFlags.push(key);
        }

        state.availableExtraFlags = availableExtraFlags;
    });

    return (
        <Speak assets={["panel"]}>
            <Layout>
                <div>
                    <h1>flags.sh</h1>
                    <h3>{t("app.description")}</h3>
                </div>
                <div>
                    <div>
                        <h2>{t("panel.environment.label")}</h2>
                        <Config label={t("panel.operatingSystem.label")} description={t("panel.operatingSystem.description")}>
                            <select onChange$={event => {
                                setConfig.operatingSystem = event.target.value;
                            }}>
                                {Object.keys(operatingSystem).map(key => (
                                    <option key={key} value={key}>{t(`panel.operatingSystem.${key}`)}</option>
                                ))}
                            </select>
                        </Config>
                        <Config label={t("panel.serverType.label")} description={t("panel.serverType.description")}>
                            <select onChange$={event => {
                                setConfig.serverType = event.target.value;
                            }}>
                                {Object.keys(serverType).map(key => (
                                    <option key={key} value={key}>{t(`panel.serverType.${key}`)}</option>
                                ))}
                            </select>
                        </Config>
                    </div>
                    <div>
                        <h2>{t("panel.config.label")}</h2>
                        <div>
                            <FileName onChange$={event => {
                                setConfig.fileName = event.target.value;
                            }} />
                            <Memory onChange$={event => {
                                setConfig.memory = event.target.value;
                            }} />
                        </div>
                        <div>
                            <Flags availableFlags={state.availableFlags} onChange$={event => {
                                setConfig.flags = event.target.value;
                            }} />
                            <ExtraFlags visible={state.availableExtraFlags.length > 0} availableExtraFlags={state.availableExtraFlags} onChange$={event => {
                                setConfig.extraFlags = event.target.value;
                            }} />
                        </div>
                        <div>
                            <Gui visible={state.availableConfig.includes("gui")} onChange$={event => {
                                setConfig.gui = event.target.value;
                            }} />
                            <AutoRestart visible={state.availableConfig.includes("autoRestart")} onChange$={event => {
                                setConfig.autoRestart = event.target.value;
                            }} />
                            <Variables visible={state.availableConfig.includes("variables")} onChange$={event => {
                                setConfig.variables = event.target.value;
                            }} />
                        </div>
                    </div>
                    <div>
                        <h2>{t("panel.script.label")}</h2>
                        <Resource value={generate} onPending={() => <div>Loading...</div>} onResolved={result => <p>{result}</p>} />
                        <button onClick$={() => {
                            state.generate = !state.generate; // hacky workaround
                        }}>run</button>
                    </div>
                </div>
                <div>
                    <button onClick$={() => {
                        state.advanced = !state.advanced;
                    }}>
                        {t("panel.advanced")}
                    </button>
                </div>
                <div>
                    <ChangeColorScheme />
                    <ChangeLocale />
                </div>
            </Layout>
        </Speak>
    );
});
