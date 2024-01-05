export type Environment = "development" | "test";

const environment = (process.env.NODE_ENV as Environment) || "development";
const isTestEnv = environment === "test";

export { environment, isTestEnv };
