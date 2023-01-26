
import type { AvailableConfig } from "~/data/config";
import type { AvailableFlags, AvailableExtraFlags } from "~/data/flags";
import { $, component$, Resource, useResource$, useStore } from "@builder.io/qwik";
import { operatingSystem } from "~/data/environment/operatingSystem";
import { serverType } from "~/data/environment/serverType";
import { config, getDefaults } from "~/data/config";
import { $translate as t, Speak, useSpeakLocale } from "qwik-speak";
import { FileName } from "~/component/config/file-name/file-name";
import { Flags } from "~/component/config/flags/flags";
import { Memory } from "~/component/config/memory/memory";
import { Gui } from "~/component/config/gui/gui";
import { AutoRestart } from "~/component/config/auto-restart/auto-restart";
import { ExtraFlags } from "~/component/config/extra-flags/extra-flags";
import { Variables } from "~/component/config/variables/variables";
import { extraFlags } from "~/data/flags";
import { showSaveFilePicker } from "native-file-system-adapter";
import { loader$, useNavigate } from "@builder.io/qwik-city";

interface State {
    "availableConfig": AvailableConfig[],
    "availableFlags": AvailableFlags[],
    "availableExtraFlags": AvailableExtraFlags[],
    "showDownload": boolean,
    "advanced": boolean,
    "generate": boolean // hacky workaround
}

type SetConfigState = {
    [key in AvailableConfig]: any
}

export const getOrigin = loader$<unknown, string>(({ url }) => {
    return url.origin;
});

export const getToSend = $((config: SetConfigState, availableConfig: State["availableConfig"]) => {
    const toSend = {}; // todo: types

    for (const [key, value] of Object.entries(config)) {
        if (key !== "operatingSystem" && key !== "serverType" && !availableConfig.includes(key)) {
            continue;
        }

        toSend[key] = value;
    }

    return toSend;
});

export default component$(() => {
    const origin = getOrigin.use();
    const { lang } = useSpeakLocale();
    const navigate = useNavigate();

    const state = useStore<State>({
        "advanced": false,
        "availableConfig": [],
        "availableFlags": [],
        "availableExtraFlags": [],
        "showDownload": true,
        "generate": false // hacky workaround
    });

    const setConfig = useStore<SetConfigState>(getDefaults());

    useResource$(({ track }) => {
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

        state.availableConfig = availableConfig;
        state.availableFlags = selectedServerType.flags;
        state.showDownload = !!selectedOperatingSystem.file;
        setConfig.flags = selectedServerType.default.flags;
        setConfig.extraFlags = selectedServerType.default.extraFlags;
    });

    useResource$(({ track }) => {
        const setFlags = track(() => setConfig.flags);
        const setServerType = track(() => setConfig.serverType);
        const selectedServerType = serverType[setServerType];

        const availableExtraFlags: AvailableExtraFlags[] = [];
        for (const [key, value] of Object.entries(extraFlags)) {
            if (!value.supports.includes(setFlags) || !selectedServerType.extraFlags?.includes(key)) {
                continue;
            }

            availableExtraFlags.push(key);
        }

        state.availableExtraFlags = availableExtraFlags;
    });

    const generate = useResource$<string>(async ({ track, cleanup }) => {
        track(() => state.generate); // hacky workaround
        const selectedConfig = track(() => setConfig);

        const abortController = new AbortController();
        cleanup(() => {
            abortController.abort("cleanup");
        });

        const toSend = await getToSend(selectedConfig, state.availableConfig);
        const url = new URL("/api/v1/generate", origin.value);

        for (const [key, value] of Object.entries(toSend)) {
            url.searchParams.set(key, JSON.stringify(value));
        }

        url.searchParams.set("withFlags", "false");

        const response = await fetch(url.href, {
            "signal": abortController.signal
        });

        const data = await response.json();
        return data.result;
    });

    return (
        <Speak assets={["panel"]}>
            <div>
                <div>
                    <h2>{t("panel.config.label")}</h2>
                    <p>{t("panel.config.description")}</p>
                    <div>
                        <FileName value={setConfig.fileName} onChange={$(event => {
                            setConfig.fileName = event.target.value;
                        })}/>
                        <Flags value={setConfig.flags} availableFlags={state.availableFlags} onChange={$(event => {
                            if (!event.target.value) {
                                return;
                            }

                            setConfig.flags = event.target.value;
                        })}/>
                    </div>
                    <ExtraFlags value={setConfig.extraFlags} visible={state.availableExtraFlags.length > 0} availableExtraFlags={state.availableExtraFlags} onChange={$(event => {
                        if (!event.target.value) {
                            return;
                        }

                        setConfig.extraFlags = event.target.value;
                    })}/>
                    <Memory value={setConfig.memory} onChange={$(event => {
                        setConfig.memory = Number.parseInt(event.target.value);
                    })}/>
                    <div>
                        <Gui visible={state.availableConfig.includes("gui")} value={setConfig.gui} onChange={$(event => {
                            setConfig.gui = event.target.checked;
                        })}/>
                        <AutoRestart visible={state.availableConfig.includes("autoRestart")} value={setConfig.autoRestart} onChange={$(event => {
                            setConfig.autoRestart = event.target.checked;
                        })}/>
                        <Variables visible={state.availableConfig.includes("variables")} value={setConfig.variables} onChange={$(event => {
                            setConfig.variables = event.target.checked;
                        })}/>
                    </div>
                    <div>
                        <label>
                            {t("panel.advanced")}
                            <input type="checkbox" onChange$={event => {
                                state.advanced = event.target.checked;
                            }}/>
                        </label>
                    </div>
                </div>
                <div>
                    <h2>{t("panel.script.label")}</h2>
                    <p>{t("panel.script.description", {
                        "fileName": setConfig.fileName
                    })}</p>
                    <pre style={{"whiteSpace": "pre-line"}}>
                        <Resource value={generate} onResolved={result => <code>{result}</code>}/>
                    </pre>
                    <div>
                        <button class={state.showDownload ? undefined : "configHidden"} onClick$={async () => {
                            const selectedOperatingSystem = operatingSystem[setConfig.operatingSystem];
                            if (!selectedOperatingSystem || !selectedOperatingSystem.file) {
                                return;
                            }

                            const data = await generate.value;

                            const fileHandle = await showSaveFilePicker({
                                "_preferPolyfill": false,
                                "suggestedName": `start${selectedOperatingSystem.file.extension}`,
                                "types": [{
                                    "accept": {
                                        [selectedOperatingSystem.file.mime]: [selectedOperatingSystem.file.name ?? selectedOperatingSystem.file.mime]
                                    }
                                }]
                            });

                            const blob = new Blob([data], {
                                "type": selectedOperatingSystem.file.mime
                            });

                            await blob.stream().pipeTo(await fileHandle.createWritable());
                        }}>{t("panel.download")}</button>
                        <button onClick$={async () => {
                            if (generate.loading) {
                                return;
                            }

                            const data = await generate.value;
                            await navigator.clipboard.writeText(data);
                        }}>{t("panel.copy")}</button>
                        <button onClick$={async () => {
                            const toSend = await getToSend(setConfig, state.availableConfig);
                            const url = new URL("/api/v1/share", origin.value);

                            const response = await fetch(url, {
                                "method": "post",
                                "body": JSON.stringify(toSend)
                            });

                            const data = await response.json();

                            await navigate(`/${lang}/share/${data.id}`);
                        }}>{t("panel.share")}</button>
                    </div>
                    <button onClick$={() => {
                        state.generate = !state.generate; // hacky workaround
                    }}>
                        Generate
                    </button>
                </div>
            </div>
        </Speak>
    );
});
