import type { Config } from "jest";

const config: Config = {
    bail: true,
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/src"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    moduleFileExtensions: ["ts", "js", "json", "node"],
    testMatch: ["**/?(*.)+(spec|test).ts"]
};

export default config;
