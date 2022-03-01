import { BlitzConfig } from "blitz";

const config: BlitzConfig = {
    "webpack": config => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            "fs": false
        };

        return config;
    }
};

module.exports = config;
