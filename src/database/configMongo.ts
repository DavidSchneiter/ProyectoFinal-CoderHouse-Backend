import mongoose from "mongoose";
import dotenv from 'dotenv';
import { logger } from "../utils";
dotenv.config()
export const dbConnection = async () => {
  try {
    await mongoose.connect(`${process.env.DB_CNN}`);
    logger.info("Mongoose connection")
  } catch (error) {
      logger.error(error);
      throw new Error("Error a la hora de inicializar BD")
  }
};
