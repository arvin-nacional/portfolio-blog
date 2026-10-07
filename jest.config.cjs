/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**/*.test.cjs"],
  // Source loaders transpile TypeScript and inject isolated service adapters.
  // Keep real .env files and production services out of these unit tests.
  transform: {},
  clearMocks: true,
  maxWorkers: 2,
};
