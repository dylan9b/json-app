/** @type {import('jest').Config} */
export const preset = "jest-preset-angular";
export const setupFilesAfterEnv = ["<rootDir>/src/setup.jest.ts"];
export const testPathIgnorePatterns = [
  "<rootDir>/node_modules/",
  "<rootDir>/dist/",
];
export const moduleFileExtensions = ["ts", "js", "html"];
export const moduleNameMapper = {
  "^@shared/(.*)$": "<rootDir>/src/app/shared/$1",
  "^@components/(.*)$": "<rootDir>/src/app/components/$1",
  "^@pages/(.*)$": "<rootDir>/src/app/pages/$1",
  "^@services/(.*)$": "<rootDir>/src/app/services/$1",
  "^@store/(.*)$": "<rootDir>/src/app/store/$1",
};
export const globals = {
  "ts-jest": {
    tsconfig: "<rootDir>/tsconfig.spec.json",
    stringifyContentPathRegex: "\\.html$",
  },
};
