import { Resource, component$, useResource$, useStore } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { CodeBlock } from "~/components/code-block/code-block";
import { Grid } from "~/components/grid/grid";

export const useOrigin = routeLoader$<string>(({ url }) => {
  return url.origin;
});

export default component$(() => {
  const origin = useOrigin();

  const config = useStore({
    "operatingSystem": "linux",
    "softaware": "paper",
    "gui": false,
    "variables": false,
    "autoRestart": false,
    "flags": "aikars",
    "fileName": "server.jar",
    "memory": 4
  });

  const scriptResource = useResource$(async ({ track, cleanup }) => {
      const usedConfig = track(config);

      const abortController = new AbortController();
      cleanup(() => {
        abortController.abort("cleanup");
      });

      const apiEndpoint = new URL("/api/v1/generate", origin.value);
      for (const [key, value] of Object.entries(usedConfig)) {
        apiEndpoint.searchParams.set(key, JSON.stringify(value));
      }

      apiEndpoint.searchParams.set("withFlags", "false");

      const response = await fetch(apiEndpoint.href, {
        "signal": abortController.signal
      });

      const generatedResult = await response.json();
      return generatedResult.script;
  })

  return (
    <>
      <h1>flags.sh</h1>
      <div>
        <h3>Environment</h3>
        <Grid>
          <button class={config.operatingSystem === "linux" && "filled"} onClick$={() => {
            config.operatingSystem = "linux";
          }}>
            <h4>Linux</h4>
            <p>The most common operating system used for servers</p>
          </button>
          <button class={config.operatingSystem === "windows" && "filled"} onClick$={() => {
            config.operatingSystem = "windows";
          }}>
            <h4>Windows</h4>
            <p>The most common operating system used for home desktops</p>
          </button>
          <button class={config.operatingSystem === "macOS" && "filled"} onClick$={() => {
            config.operatingSystem = "macOS";
          }}>
            <h4>macOS</h4>
            <p>Apple's operating system </p>
          </button>
          <button class={config.operatingSystem === "pterodactyl" && "filled"} onClick$={() => {
            config.operatingSystem = "pterodactyl";
          }}>
            <h4>Pterodactyl</h4>
            <p>Web-based server management platform used by most hosts</p>
          </button>
          <button class={config.operatingSystem === "command" && "filled"} onClick$={() => {
            config.operatingSystem = "command";
          }}>
            <h4>Command</h4>
            <p>Only the Java command required to start the server</p>
          </button>
        </Grid>
      </div>
      <div>
        <h3>Software</h3>
        <Grid>
          <button class={config.softaware === "paper" && "filled"} onClick$={() => {
            config.softaware = "paper";
          }}>
            <h4>Paper</h4>
            <p>Bukkit-based plugin loader</p>
          </button>
          <button class={config.softaware === "purpur" && "filled"} onClick$={() => {
            config.softaware = "purpur";
          }}>
            <h4>Purpur</h4>
            <p>Bukkit-based plugin loader but more</p>
          </button>
          <button class={config.softaware === "velocity" && "filled"} onClick$={() => {
            config.softaware = "velocity";
          }}>
            <h4>Velocity</h4>
            <p>Proxy with plugin loader</p>
          </button>
          <button class={config.softaware === "waterfall" && "filled"} onClick$={() => {
            config.softaware = "waterfall";
          }}>
            <h4>Waterfall</h4>
            <p>Depricated proxy</p>
          </button>
        </Grid>
      </div>
      <div>
        <h3>Options</h3>
        <Grid>
          <button class={config.gui && "filled"} onClick$={() => {
            config.gui = !config.gui;
          }}>
            <h4>GUI</h4>
            <p>Whether to show the management window</p>
          </button>
          <button class={config.variables && "filled"} onClick$={() => {
            config.variables = !config.variables;
          }}>
            <h4>Variables</h4>
            <p>Place commonly modified arguments at the top of the script</p>
          </button>
          <button class={config.autoRestart && "filled"} onClick$={() => {
            config.autoRestart = !config.autoRestart;
          }}>
            <h4>Auto Restart</h4>
            <p>Automatically restart the server once stopped</p>
          </button>
        </Grid>
      </div>
      <div>
        <h3>Flags</h3>
        <Grid>
          <label>
            <p>Set</p>
            <select onChange$={event => {
              config.flags = event.target.value;
            }}>
              <option value="aikars">Aikar's Flags</option>
              <option value="none">None</option>
            </select>
          </label>
        </Grid>
        <Grid>
          <label>
            <p>File name</p>
            <input type="text" onChange$={event => {
              config.fileName = event.target.value;
            }} placeholder="server.jar"></input>
          </label>
          <label>
            <p>Memory</p>
            <input type="range" min={1} max={16} step={1} value={4} onChange$={event => {
              config.memory = Number.parseInt(event.target.value)
            }}></input>
          </label>
        </Grid>
      </div>
      <div>
        <h3>Result</h3>
        <CodeBlock>
          <Resource value={scriptResource} onResolved={script => <span>{script}</span>}/>
        </CodeBlock>
        <Grid>
          <button>Download</button>
          <button>Copy</button>
        </Grid>
      </div>
    </>
  );
});
