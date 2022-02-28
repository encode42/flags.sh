import { BlitzConfig } from "blitz";

const config: BlitzConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            "fs": false
        };

        return config;
    },
};

module.exports = config;
