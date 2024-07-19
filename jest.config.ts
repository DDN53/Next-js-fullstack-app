import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    jsx: "react-jsx",
  },
  verbose: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1",
  },
  preset: "ts-jest",

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: ["/node_modules/"],
};

export default createJestConfig(config);
