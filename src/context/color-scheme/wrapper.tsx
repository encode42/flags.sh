import type { ColorSchemes } from "~/util/interface/color-schemes/type";
import type { ColorSchemeState } from "~/context/color-scheme/context";
import { component$, Slot, useContextProvider, useStore } from "@builder.io/qwik";
import { ColorSchemeContext } from "~/context/color-scheme/context";

export interface ColorSchemeProps {
    "colorScheme"?: ColorSchemes
}

export const ColorScheme = component$(({ colorScheme }: ColorSchemeProps) => {
    const state = useStore<ColorSchemeState>({
        "value": colorScheme ?? "system"
    });

    useContextProvider(ColorSchemeContext, state);

    return <Slot />;
});
