import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Missing Bearer token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, role }
    next();
  } catch (e) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid token" });
  }
}

export function requireRole(...roles) {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("role");
      if (!user) return res.status(401).json({ error: "User not found" });
      if (!roles.includes(user.role))
        return res.status(403).json({ error: "Forbidden" });
      next();
    } catch (e) {
      next(e);
    }
  };
}
