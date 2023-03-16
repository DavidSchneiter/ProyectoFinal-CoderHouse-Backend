import mongoose from "mongoose";
import { logger, config } from "../utils";

export const dbConnection = async () => {
  try {
    await mongoose.connect(`${config.DB_CNN}`);
    logger.info("Mongoose connection")
  } catch (error) {
      logger.error(error);
      throw new Error("Error a la hora de inicializar BD")
  }
};
