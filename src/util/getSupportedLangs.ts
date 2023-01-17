import * as fs from "fs";
import path from "path";

export function getSupportedLangs(write = true): string[] {
    const files = fs.readdirSync(path.resolve("./public/i18n"), {
        "withFileTypes": true
    });

    const directories = files.filter(file => file.isDirectory()).map(directory => directory.name);

    if (write) {
        fs.writeFileSync(path.resolve("./server/supportedLocales.json"), JSON.stringify(directories));
    }

    return directories;
}
