import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    status: { type: String, enum: ["todo", "in_progress", "done"], default: "todo" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

TaskSchema.index({ owner: 1, createdAt: -1 });

export default mongoose.model("Task", TaskSchema);
