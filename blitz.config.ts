import { BlitzConfig } from "blitz";

const isProd = process.env.NODE_ENV === "production";

const config: BlitzConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            "fs": false
        };

        return config;
    },
    "assetPrefix": isProd ? "/LaunchMC/" : ""
};

module.exports = config;
