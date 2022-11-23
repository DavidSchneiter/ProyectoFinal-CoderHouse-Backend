import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()
export const dbConnection = async () => {
  try {
    await mongoose.connect(`${process.env.DB_CNN}`);
    console.log("Mongoose connection")
  } catch (error) {
      console.log(error);
      throw new Error("Error a la hora de inicializar BD")
  }
};
