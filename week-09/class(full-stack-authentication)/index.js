import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./utils/dbConnection.js";
import userRoutes from "./routes/user.route.js";
import { errorMiddlewares } from "./middlewares/errors.js";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(
  cors({
    origin: process.env.BASIC_URL,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);

app.use(errorMiddlewares);
app.use("*", (req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});

const port = process.env.PORT || 3000;

dbConnection();

function serverStartAndSetup() {
  app.listen(port, () => {
    console.log(`the server is running at port => ${port}`);
  });
}

serverStartAndSetup();
