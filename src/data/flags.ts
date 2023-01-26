import type { AvailableConfig } from "~/data/config";
import type { AvailableOperatingSystem } from "~/data/environment/operatingSystem";
import type { AvailableServerType } from "~/data/environment/serverType";
import type { Generate } from "~/util/interface/generate/Generate";

// TODO: Some of these flags are exclusive to Linux
// TODO: Split Pterodactyl and Command into their own option?
// TODO: Fabric, Forge, etc.

export type AvailableFlags = keyof typeof flags;
export type AvailableExtraFlags = keyof typeof extraFlags;

interface FlagOption {
    "generate": Generate<AvailableConfig & AvailableOperatingSystem & AvailableServerType>
}

interface FlagExtraOption extends FlagOption {
    "supports": AvailableFlags[],
    "generate": Generate<AvailableConfig & AvailableOperatingSystem & AvailableServerType | "existingFlags">
}

interface Flags {
    [key: string]: FlagOption
}

interface ExtraFlags {
    [key: string]: FlagExtraOption
}

const baseAikar = [
    "-XX:+UseG1GC",
    "-XX:+ParallelRefProcEnabled",
    "-XX:MaxGCPauseMillis=200",
    "-XX:+UnlockExperimentalVMOptions",
    "-XX:+DisableExplicitGC",
    "-XX:+AlwaysPreTouch",
    "-XX:G1HeapWastePercent=5",
    "-XX:G1MixedGCCountTarget=4",
    "-XX:InitiatingHeapOccupancyPercent=15",
    "-XX:G1MixedGCLiveThresholdPercent=90",
    "-XX:G1RSetUpdatingPauseTimePercent=5",
    "-XX:SurvivorRatio=32",
    "-XX:+PerfDisableSharedMem",
    "-XX:MaxTenuringThreshold=1",
    "-Dusing.aikars.flags=https://mcflags.emc.gs",
    "-Daikars.new.flags=true",
    "-XX:G1NewSizePercent=30",
    "-XX:G1MaxNewSizePercent=40",
    "-XX:G1HeapRegionSize=8M",
    "-XX:G1ReservePercent=20"
];

const baseBenchmarked = [
    "-XX:+UnlockExperimentalVMOptions",
    "-XX:+UnlockDiagnosticVMOptions",
    "-XX:+AlwaysActAsServerClassMachine",
    "-XX:+AlwaysPreTouch",
    "-XX:+DisableExplicitGC",
    "-XX:+UseNUMA",
    "-XX:NmethodSweepActivity=1",
    "-XX:ReservedCodeCacheSize=400M",
    "-XX:NonNMethodCodeHeapSize=12M",
    "-XX:ProfiledCodeHeapSize=194M",
    "-XX:NonProfiledCodeHeapSize=194M",
    "-XX:-DontCompileHugeMethods",
    "-XX:MaxNodeLimit=240000",
    "-XX:NodeLimitFudgeFactor=8000",
    "-XX:+UseVectorCmov",
    "-XX:+PerfDisableSharedMem",
    "-XX:+UseFastUnorderedTimeStamps",
    "-XX:+UseCriticalJavaThreadPriority",
    "-XX:ThreadPriorityPolicy=1",
    "-XX:AllocatePrefetchStyle=3"
];

const baseEtil = [
    "-XX:+UseG1GC",
    "-XX:+ParallelRefProcEnabled",
    "-XX:MaxGCPauseMillis=200",
    "-XX:+UnlockExperimentalVMOptions",
    "-XX:+UnlockDiagnosticVMOptions",
    "-XX:+DisableExplicitGC",
    "-XX:+AlwaysPreTouch",
    "-XX:G1HeapWastePercent=5",
    "-XX:G1MixedGCCountTarget=4",
    "-XX:G1MixedGCLiveThresholdPercent=90",
    "-XX:G1RSetUpdatingPauseTimePercent=5",
    "-XX:SurvivorRatio=32",
    "-XX:+PerfDisableSharedMem",
    "-XX:MaxTenuringThreshold=1",
    "-XX:-UseBiasedLocking",
    "-XX:UseAVX=3",
    "-XX:+UseStringDeduplication",
    "-XX:+UseFastUnorderedTimeStamps",
    "-XX:+UseAES",
    "-XX:+UseAESIntrinsics",
    "-XX:UseSSE=4",
    "-XX:+UseFMA",
    "-XX:AllocatePrefetchStyle=1",
    "-XX:+UseLoopPredicate",
    "-XX:+RangeCheckElimination",
    "-XX:+EliminateLocks",
    "-XX:+DoEscapeAnalysis",
    "-XX:+UseCodeCacheFlushing",
    "-XX:+SegmentedCodeCache",
    "-XX:+UseFastJNIAccessors",
    "-XX:+OptimizeStringConcat",
    "-XX:+UseCompressedOops",
    "-XX:+UseThreadPriorities",
    "-XX:+OmitStackTraceInFastThrow",
    "-XX:+TrustFinalNonStaticFields",
    "-XX:ThreadPriorityPolicy=1",
    "-XX:+UseInlineCaches",
    "-XX:+RewriteBytecodes",
    "-XX:+RewriteFrequentPairs",
    "-XX:+UseNUMA",
    "-XX:-DontCompileHugeMethods",
    "-XX:+UseFPUForSpilling",
    "-XX:+UseFastStosb",
    "-XX:+UseNewLongLShift",
    "-XX:+UseVectorCmov",
    "-XX:+UseXMMForArrayCopy",
    "-XX:+UseXmmI2D",
    "-XX:+UseXmmI2F",
    "-XX:+UseXmmLoadAndClearUpper",
    "-XX:+UseXmmRegToRegMoveAll",
    "-Xlog:async",
    "-Djava.security.egd=file:/dev/urandom",
];

export const flags: Flags = {
    "aikars": {
        "generate": ({ memory }) => {
            return [
                ...baseAikar,
                ...(memory < 12 ? [
                    "-XX:G1NewSizePercent=30",
                    "-XX:G1MaxNewSizePercent=40",
                    "-XX:G1HeapRegionSize=8M",
                    "-XX:G1ReservePercent=20"
                ] : [
                    "-XX:G1NewSizePercent=40",
                    "-XX:G1MaxNewSizePercent=50",
                    "-XX:G1HeapRegionSize=16M",
                    "-XX:G1ReservePercent=15"
                ])
            ];
        }
    },
    "benchmarkedG1GC": {
        "generate": () => {
            return [
                ...baseBenchmarked,
                "-XX:+UseG1GC",
                "-XX:MaxGCPauseMillis=130",
                "-XX:+UnlockExperimentalVMOptions",
                "-XX:+DisableExplicitGC",
                "-XX:+AlwaysPreTouch",
                "-XX:G1NewSizePercent=28",
                "-XX:G1HeapRegionSize=16M",
                "-XX:G1ReservePercent=20",
                "-XX:G1MixedGCCountTarget=3",
                "-XX:InitiatingHeapOccupancyPercent=10",
                "-XX:G1MixedGCLiveThresholdPercent=90",
                "-XX:G1RSetUpdatingPauseTimePercent=0",
                "-XX:SurvivorRatio=32",
                "-XX:MaxTenuringThreshold=1",
                "-XX:G1SATBBufferEnqueueingThresholdPercent=30",
                "-XX:G1ConcMarkStepDurationMillis=5",
                "-XX:G1ConcRSHotCardLimit=16",
                "-XX:G1ConcRefinementServiceIntervalMillis=150"
            ];
        }
    },
    "benchmarkedZGC": {
        "generate": () => {
            return [
                ...baseBenchmarked,
                "-XX:+UseShenandoahGC",
                "-XX:ShenandoahGCMode=iu",
                "-XX:ShenandoahGuaranteedGCInterval=1000000",
                "-XX:AllocatePrefetchStyle=1"
            ];
        }
    },
    "benchmarkedShenandoah": {
        "generate": () => {
            return [
                ...baseBenchmarked,
                "-XX:+UseShenandoahGC",
                "-XX:ShenandoahGCMode=iu",
                "-XX:ShenandoahGuaranteedGCInterval=1000000",
                "-XX:AllocatePrefetchStyle=1"
            ];
        }
    },
    "hillttys": {
        "generate": () => {
            return [
                "-XX:+UseLargePages",
                "-XX:LargePageSizeInBytes=2M",
                "-XX:+UnlockExperimentalVMOptions",
                "-XX:+UseShenandoahGC",
                "-XX:ShenandoahGCMode=iu",
                "-XX:+UseNUMA",
                "-XX:+AlwaysPreTouch",
                "-XX:-UseBiasedLocking",
                "-XX:+DisableExplicitGC"
            ];
        }
    },
    "obyduxs": {
        "generate": () => {
            return [
                "-XX:+UnlockExperimentalVMOptions",
                "-XX:+UnlockDiagnosticVMOptions",
                "-XX:+AlwaysActAsServerClassMachine",
                "-XX:+AlwaysPreTouch",
                "-XX:+DisableExplicitGC",
                "-XX:+UseNUMA",
                "-XX:AllocatePrefetchStyle=3",
                "-XX:NmethodSweepActivity=1",
                "-XX:ReservedCodeCacheSize=400M",
                "-XX:NonNMethodCodeHeapSize=12M",
                "-XX:ProfiledCodeHeapSize=194M",
                "-XX:NonProfiledCodeHeapSize=194M",
                "-XX:+PerfDisableSharedMem",
                "-XX:+UseFastUnorderedTimeStamps",
                "-XX:+UseCriticalJavaThreadPriority",
                "-XX:+EagerJVMCI",
                "-Dgraal.TuneInlinerExploration=1",
                "-Dgraal.CompilerConfiguration=enterprise",
                "-XX:+UseG1GC",
                "-XX:+ParallelRefProcEnabled",
                "-XX:MaxGCPauseMillis=200",
                "-XX:+UnlockExperimentalVMOptions",
                "-XX:+UnlockDiagnosticVMOptions",
                "-XX:+DisableExplicitGC",
                "-XX:+AlwaysPreTouch",
                "-XX:G1NewSizePercent=30",
                "-XX:G1MaxNewSizePercent=40",
                "-XX:G1HeapRegionSize=8M",
                "-XX:G1ReservePercent=20",
                "-XX:G1HeapWastePercent=5",
                "-XX:G1MixedGCCountTarget=4",
                "-XX:InitiatingHeapOccupancyPercent=15",
                "-XX:G1MixedGCLiveThresholdPercent=90",
                "-XX:G1RSetUpdatingPauseTimePercent=5",
                "-XX:SurvivorRatio=32",
                "-XX:+PerfDisableSharedMem",
                "-XX:MaxTenuringThreshold=1",
                "-XX:-UseBiasedLocking",
                "-XX:+UseStringDeduplication",
                "-XX:+UseFastUnorderedTimeStamps",
                "-XX:+UseAES",
                "-XX:+UseAESIntrinsics",
                "-XX:+UseFMA",
                "-XX:+UseLoopPredicate",
                "-XX:+RangeCheckElimination",
                "-XX:+EliminateLocks",
                "-XX:+DoEscapeAnalysis",
                "-XX:+UseCodeCacheFlushing",
                "-XX:+SegmentedCodeCache",
                "-XX:+UseFastJNIAccessors",
                "-XX:+OptimizeStringConcat",
                "-XX:+UseCompressedOops",
                "-XX:+UseThreadPriorities",
                "-XX:+OmitStackTraceInFastThrow",
                "-XX:+TrustFinalNonStaticFields",
                "-XX:ThreadPriorityPolicy=1",
                "-XX:+UseInlineCaches",
                "-XX:+RewriteBytecodes",
                "-XX:+RewriteFrequentPairs",
                "-XX:+UseNUMA",
                "-XX:-DontCompileHugeMethods",
                "-XX:+UseFPUForSpilling",
                "-XX:+UseVectorCmov",
                "-XX:+UseXMMForArrayCopy",
                "-XX:+UseTransparentHugePages",
                "-XX:+UseLargePages",
                "-Xlog:async",
                "-Djava.security.egd=file:/dev/urandom"
            ];
        }
    },
    "etils": {
        "generate": ({ memory }) => {
            return [
                ...baseEtil,
                ...(memory < 12 ? [
                    "-XX:G1NewSizePercent=30",
                    "-XX:G1MaxNewSizePercent=40",
                    "-XX:G1HeapRegionSize=8M",
                    "-XX:G1ReservePercent=20",
                    "-XX:InitiatingHeapOccupancyPercent=15"
                ] : [
                    "-XX:G1NewSizePercent=40",
                    "-XX:G1MaxNewSizePercent=50",
                    "-XX:G1HeapRegionSize=16M",
                    "-XX:G1ReservePercent=15",
                    "-XX:InitiatingHeapOccupancyPercent=20"
                ])
            ];
        }
    },
    "proxy": {
        "generate": () => {
            return [
                "-XX:+UseG1GC",
                "-XX:G1HeapRegionSize=4M",
                "-XX:+UnlockExperimentalVMOptions",
                "-XX:+ParallelRefProcEnabled",
                "-XX:+AlwaysPreTouch",
                "-XX:MaxInlineLevel=15"
            ];
        }
    },
    "none": {
        "generate": () => {
            return [];
        }
    }
};

export const extraFlags: ExtraFlags = {
    "vectors": {
        "supports": ["aikars"],
        "generate": ({ existingFlags }) => {
            return [
                ...existingFlags,
                "--add-modules=jdk.incubator.vector"
            ];
        }
    },
    "benchmarkedGraalVM": {
        "supports": ["benchmarkedG1GC"],
        "generate": ({ existingFlags }) => {
            return [
                ...existingFlags,
                "-XX:+UnlockExperimentalVMOptions",
                "-XX:+UnlockDiagnosticVMOptions",
                "-XX:+AlwaysActAsServerClassMachine",
                "-XX:+AlwaysPreTouch",
                "-XX:+DisableExplicitGC",
                "-XX:+UseNUMA",
                "-XX:AllocatePrefetchStyle=3",
                "-XX:NmethodSweepActivity=1",
                "-XX:ReservedCodeCacheSize=400M",
                "-XX:NonNMethodCodeHeapSize=12M",
                "-XX:ProfiledCodeHeapSize=194M",
                "-XX:NonProfiledCodeHeapSize=194M",
                "-XX:-DontCompileHugeMethods",
                "-XX:+PerfDisableSharedMem",
                "-XX:+UseFastUnorderedTimeStamps",
                "-XX:+UseCriticalJavaThreadPriority",
                "-XX:+EagerJVMCI",
                "-Dgraal.TuneInlinerExploration=1",
                "-Dgraal.CompilerConfiguration=enterprise"
            ];
        }
    }
};
