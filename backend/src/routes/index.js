import { Router } from "express";
import authRoutes from "./v1/auth.routes.js";
import taskRoutes from "./v1/task.routes.js";

const router = Router();

router.use("/v1/auth", authRoutes);
router.use("/v1/tasks", taskRoutes);

export default router;
