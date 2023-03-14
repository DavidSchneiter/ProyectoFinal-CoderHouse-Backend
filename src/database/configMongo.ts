import mongoose from "mongoose";
import config from '../utils/config';
import { logger } from "../utils";

export const dbConnection = async () => {
  try {
    await mongoose.connect(`${config.DB_CNN}`);
    logger.info("Mongoose connection")
  } catch (error) {
      logger.error(error);
      throw new Error("Error a la hora de inicializar BD")
  }
};
