import cors from "cors";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import { xss } from "express-xss-sanitizer";
import helmet from "helmet";
import hpp from "hpp";

import config from "./configs/config.js";
import checkAuth from "./middlewares/checkAuth.js";
import customRoutes from "./routers/index.router.js";

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: config.limiter.requestTime,
  limit: config.limiter.requestNumber,
});

app.use(limiter);

app.use(express.json({ limit: config.limit.maxJsonSize }));
app.use(
  express.urlencoded({ extended: true, limit: config.limit.maxJsonSize }),
);

app.use(mongoSanitize({ replaceWith: "_" }));
app.use(xss());
app.use(hpp());

app.use(
  cors({
    origin: config.cors.origin,
    // credentials: true,
  }),
);

app.use(checkAuth);

app.use("/api/v1", customRoutes);

app.get("/", (req, res) => {
  res.status(200).send({
    conntected: true,
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
