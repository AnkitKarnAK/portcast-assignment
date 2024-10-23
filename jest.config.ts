export default {
    preset: 'ts-jest',
    "collectCoverage": true,
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    "collectCoverageFrom": [
        "src/**/*.{js,ts,tsx}",
        "!src/index.tsx",
        "!**/node_modules/**"
    ],
    "coverageThreshold": {
        "global": {
            "branches": 80,
            "functions": 80,
            "lines": 80,
            "statements": 80
        }
    }
}