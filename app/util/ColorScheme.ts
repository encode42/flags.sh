import { MantineColor, MantineTheme, Tuple } from "@mantine/core";
import { arrayify } from "./util";
import ColorSchemeOptions, { DefaultColorScheme } from "./interfaces/ColorSchemeOptions";

export default class ColorScheme {
    private readonly currentScheme: Record<MantineColor, Tuple<string, 10>>;
    private readonly defaultColor: string;

    constructor(defaultTheme: MantineTheme, defaultColor?: string) {
        this.currentScheme = defaultTheme.colors;
        this.defaultColor = defaultColor ?? "blue";
    }

    public mod(options: ColorSchemeOptions): ColorScheme {
        let newTheme;

        if (options.default) {
            if (Array.isArray(options.default)) {
                if (options.default.length >= 10) {
                    // Set the named color to provided colors
                    newTheme = options.default;
                } else {
                    ColorScheme.error(`Expected string or array of 10 strings, got ${options.default}`);
                    return this;
                }
            } else {
                // Get color scheme from current Mantine theme
                newTheme = this.currentScheme[options.default];
            }
        } else {
            newTheme = this.currentScheme[options.name];
        }

        // Ensure the color scheme was found
        if (!newTheme) {
            ColorScheme.error("Could not find or generate the default theme.");
            return this;
        }

        // Change the provided colors
        if (options.colors) {
            const colors = arrayify(options.colors);

            for (const color of colors) {
                newTheme[color.index] = color.hex;
            }
        }

        this.currentScheme[options.name] = newTheme;

        return this;
    }

    public get(): Record<MantineColor, Tuple<string, 10>> {
        return this.currentScheme;
    }

    public getDefault(): DefaultColorScheme {
        return  {
            "name": this.defaultColor,
            "colors": this.currentScheme[this.defaultColor] ?? this.currentScheme[0]
        };
    }

    private static error(message: string): void {
        console.error(`Invalid default color scheme provided! ${message}`);
    }
}
