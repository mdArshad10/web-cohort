import mongoose from "mongoose";
import { MONGO_URL } from "../const/envConstant.js";
import {DATABASE} from '../const/constant.js'

export const dbConnection = async () => {
  try {
    const dbInstance = await mongoose.connect(`${MONGO_URL}/${DATABASE}`);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB connection failed", error);
    process.exit(1);
  }
};
