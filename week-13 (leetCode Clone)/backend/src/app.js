import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import healthCheckup from "./routes/health.routes.js";
import userRoutes from "./routes/user.routes.js";
import { ORIGIN } from "./lib/constants.js";

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

export { app };
