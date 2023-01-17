import type { ColorSchemes } from "~/util/interface/color-schemes/type";
import { createContext } from "@builder.io/qwik";

export interface ColorSchemeState {
    "value"?: ColorSchemes
}

export const ColorSchemeContext = createContext<ColorSchemeState>("colorScheme");
