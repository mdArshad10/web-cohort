import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log(`The database is connected`);
    })
    .catch((err) => {
      "The Database connection is Failed";
    });
};
