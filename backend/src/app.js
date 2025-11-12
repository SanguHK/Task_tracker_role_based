import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { StatusCodes } from "http-status-codes";
import router from "./routes/index.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 120,
    standardHeaders: "draft-7",
    legacyHeaders: false
  })
);

app.get("/", (_req, res) => {
  res.status(StatusCodes.OK).json({ ok: true, message: "API OK" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", router);

app.use(notFound);
app.use(errorHandler);

export default app;
