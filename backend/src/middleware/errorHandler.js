import { StatusCodes } from "http-status-codes";

export function notFound(_req, res, _next) {
  res.status(StatusCodes.NOT_FOUND).json({ error: "Route not found" });
}

export function errorHandler(err, _req, res, _next) {
  console.error(err);
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(status).json({
    error: err.message || "Internal Server Error",
    details: err.details || undefined
  });
}
