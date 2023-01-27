import winston from 'winston';

export const logger: winston.Logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      filename: "./src/logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "./src/logs/warn.log",
      level: "warn",
    }),
  ],
});
