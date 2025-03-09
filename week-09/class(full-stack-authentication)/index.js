import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./utils/dbConnection.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.BASIC_URL,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/v1/users", userRoutes);

const port = process.env.PORT || 3000;

dbConnection();

app.listen(port, () => {
  console.log(`the server is running at port => ${port}`);
});
