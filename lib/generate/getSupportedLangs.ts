import * as fs from "fs";
import path from "path";

export function getSupportedLangs() {
    console.log("Generating supported languages...");
    const files = fs.readdirSync(path.resolve("./public/i18n"), {
        "withFileTypes": true
    });

    const directories = files.filter(file => file.isDirectory()).map(directory => directory.name);

    fs.writeFileSync(path.resolve("./src/generated/supportedLocales.json"), JSON.stringify(directories));
}
