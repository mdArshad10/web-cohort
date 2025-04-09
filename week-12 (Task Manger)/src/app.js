import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { ApiResponse } from "./utils/api-response.js";

const app = express();
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    // todo: it store in env
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PATCH", "OPTION"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(cookieParser());

import healthRoutes from "./routes/health.routes.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import { ErrorMiddleware } from "./middlewares/globalError.js";

app.use("/api/v1", healthRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use(ErrorMiddleware)
app.use("*", (req, res, next) => {
  res.status(200).json(new ApiResponse(200, {}, "route is not found"));
});

export { app };
