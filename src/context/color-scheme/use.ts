import type { ColorSchemes } from "~/util/interface/color-schemes/type";
import { useContext } from "@builder.io/qwik";
import { ColorSchemeContext } from "~/context/color-scheme/context";

export const useColorScheme = (): ColorSchemes | undefined => useContext(ColorSchemeContext).value;
