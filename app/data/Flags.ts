import FlagsInterface from "./interface/FlagsInterface";

const aikars = {
    "base": "-XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true",
    "standard": "-XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20",
    "large": "-XX:G1NewSizePercent=40 -XX:G1MaxNewSizePercent=50 -XX:G1HeapRegionSize=16M -XX:G1ReservePercent=15"
};

export const Flags: FlagsInterface = {
    "types": {
        "none": {
            "result": ({ memory, filename, gui, modernJava }) => {
                return `${Flags.prefix({ memory, modernJava })} ${Flags.suffix({ filename, gui })}`;
            }
        },
        "aikars": {
            "result": ({ memory, filename, gui, modernJava }) => {
                const base = `${aikars.base} ${memory >= 12 ? aikars.large : aikars.standard}`;
                return `${Flags.prefix({ memory, modernJava })} ${base} ${Flags.suffix({ filename, gui })}`;
            },
        }
    },
    "prefix": ({ memory, modernJava }) => {
        const targetMem = memory * 1024;
        const displayMemory = `${targetMem?.toFixed(0)}M`;
        return `java -Xms${displayMemory} -Xmx${displayMemory} ${modernJava ? "--add-modules=jdk.incubator.vector" : ""}`.trim();
    },
    "suffix": ({ filename, gui }) => {
        return `-jar ${filename} ${!gui ? "--nogui" : ""}`.trim();
    }
};
