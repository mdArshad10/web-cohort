import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import healthCheckup from "./routes/health.routes.js";
import userRoutes from "./routes/user.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import executeCodeRoutes from "./routes/executeCode.routes.js";
import { ORIGIN } from "./lib/constants.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "./utils/api-response.js";
const app = express();

// middlewares
app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({ extended: true, limit: "15kb" }));
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ORIGIN,
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true,
    allowedHeaders: ["content-type/application"],
  })
);
app.use(cookieParser());

// routes
app.use("/api/v1", healthCheckup);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/problem", problemRoutes);
app.use("/api/v1/execute-code", executeCodeRoutes);

app.use(errorMiddleware);

export { app };
