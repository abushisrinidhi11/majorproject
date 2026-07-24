/** @type {import('jest').Config} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",

    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.test.json"
        }
    },

    roots: ["<rootDir>/src/tests"],

    testMatch: [
        "**/*.test.ts"
    ],

    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },

    moduleFileExtensions: [
        "ts",
        "js",
        "json"
    ],

    setupFilesAfterEnv: [
        "<rootDir>/src/tests/setup.ts"
    ],

    clearMocks: true
};