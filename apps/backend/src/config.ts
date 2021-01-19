import convict from "convict";

export interface Config {
  bcrypt_cost: number;
  env: "development" | "production";
  jwt_secret: string;
  mongo_uri: string;
  port: number;
}

const config = convict<Config>({
  bcrypt_cost: {
    doc: "The cost for the bcrypt hashing algorithm.",
    default: 12,
    env: "BCRYPT_COST",
    format: "nat"
  },
  env: {
    doc: "The application environment.",
    default: "development",
    env: "NODE_ENV",
    format: ["production", "development"]
  },
  jwt_secret: {
    doc: "The JWT secret.",
    default: "",
    env: "JWT_SECRET",
    format: (value) => {
      if (typeof value !== "string" || !value) {
        throw new Error("must provide JWT secret as a string");
      }
    },
    sensitive: true
  },
  mongo_uri: {
    doc: "The mongo URI to connect to.",
    default: "mongodb://localhost:27017",
    format: String,
    sensitive: true
  },
  port: {
    doc: "The port to listen on.",
    arg: "port",
    default: 8080,
    env: "PORT",
    format: "port"
  }
});

config.loadFile(`./configs/${config.get("env")}.json`);

config.validate({ allowed: "strict" });

export default config;
