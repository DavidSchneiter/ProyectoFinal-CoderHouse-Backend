import path from "path";
import dotenv from "dotenv";
// Parsing the env file.
if (process.env.NODE_ENV === "production") {
    dotenv.config({ path: path.resolve(__dirname, "../../.env.production") });
} else if (process.env.NODE_ENV === "development") {
    dotenv.config({ path: path.resolve(__dirname, "../../.env.development") });
} else {
  dotenv.config();
}

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
  DB_CNN: string | undefined;
  DATABASE: string | undefined;
  SECRET_KEY: string | undefined;
  MAIL: string | undefined;
  MAIL_PASSWORD: string | undefined;
  ACCOUNT_SID: string | undefined;
  AUTH_TOKEN: string | undefined;
  WPP_TWILIO: string | undefined;
  WPP_ADMINISTRADOR: string | undefined;
  MODO: string | undefined;
  FIREBASE: string | undefined;
}

interface Config {
    NODE_ENV: string;
    PORT: number;
    DB_CNN: string;
    DATABASE: string ;
    SECRET_KEY: string;
    MAIL: string;
    MAIL_PASSWORD: string;
    ACCOUNT_SID: string;
    AUTH_TOKEN: string;
    WPP_TWILIO: string;
    WPP_ADMINISTRADOR: string;
  MODO: string;
  FIREBASE: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: Number(process.env.PORT),
    DB_CNN: process.env.DB_CNN,
    DATABASE: process.env.DATABASE,
    SECRET_KEY: process.env.SECRET_KEY,
    MAIL: process.env.MAIL,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    ACCOUNT_SID: process.env.ACCOUNT_SID,
    AUTH_TOKEN: process.env.AUTH_TOKEN,
    WPP_TWILIO: process.env.WPP_TWILIO,
    WPP_ADMINISTRADOR: process.env.WPP_ADMINISTRADOR,
    MODO: process.env.MODO,
    FIREBASE: process.env.FIREBASE,
  };
};

// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

export const sanitizedConfig = getSanitzedConfig(config);
