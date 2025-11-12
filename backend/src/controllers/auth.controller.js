import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

function signToken(user) {
  return jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
}

export async function register(req, res, next) {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email already in use" });

    const user = await User.create({ name, email, password, role });
    const token = signToken(user);
    res.status(StatusCodes.CREATED).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token
    });
  } catch (e) {
    next(e);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = signToken(user);
    res.status(StatusCodes.OK).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token
    });
  } catch (e) {
    next(e);
  }
}
