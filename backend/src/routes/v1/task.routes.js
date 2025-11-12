import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import {
  createTaskSchema,
  idParamSchema,
  updateTaskSchema
} from "../../validators/task.schema.js";
import {
  listTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
} from "../../controllers/task.controller.js";

const router = Router();

router.use(requireAuth);
router.get("/", listTasks);
router.post("/", validate(createTaskSchema), createTask);
router.get("/:id", validate(idParamSchema), getTask);
router.put("/:id", validate(updateTaskSchema), updateTask);
router.delete("/:id", validate(idParamSchema), deleteTask);

export default router;
