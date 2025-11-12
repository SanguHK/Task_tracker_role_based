import { StatusCodes } from "http-status-codes";
import Task from "../models/Task.js";

export async function listTasks(req, res, next) {
  try {
    const filter = req.user.role === "admin" ? {} : { owner: req.user.id };
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json({ tasks });
  } catch (e) {
    next(e);
  }
}

export async function createTask(req, res, next) {
  try {
    const payload = { ...req.body, owner: req.user.id };
    const task = await Task.create(payload);
    res.status(StatusCodes.CREATED).json({ task });
  } catch (e) {
    next(e);
  }
}

export async function getTask(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    if (req.user.role !== "admin" && task.owner.toString() !== req.user.id)
      return res.status(403).json({ error: "Forbidden" });
    res.json({ task });
  } catch (e) {
    next(e);
  }
}

export async function updateTask(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    if (req.user.role !== "admin" && task.owner.toString() !== req.user.id)
      return res.status(403).json({ error: "Forbidden" });

    Object.assign(task, req.body);
    await task.save();
    res.json({ task });
  } catch (e) {
    next(e);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    if (req.user.role !== "admin" && task.owner.toString() !== req.user.id)
      return res.status(403).json({ error: "Forbidden" });

    await task.deleteOne();
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    next(e);
  }
}
