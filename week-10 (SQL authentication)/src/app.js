import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "localhost:4000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "authorization"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

// Routes
import userRoutes from "./routes/user.routes.js";
import { ApiResponse } from "./utils/apiResponse.js";

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "API is running",
  });
});
app.use("/api/v1/users", userRoutes);
app.use("*", (req, res, next) => {
  res.status(200).json(new ApiResponse(404, "page not found"));
});

export { app };
