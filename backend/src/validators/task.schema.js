import { z } from "zod";

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    status: z.enum(["todo", "in_progress", "done"]).optional()
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const idParamSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({ id: z.string().length(24) }),
  query: z.object({}).optional()
});

export const updateTaskSchema = z.object({
  body: z
    .object({
      title: z.string().min(1).optional(),
      description: z.string().optional(),
      status: z.enum(["todo", "in_progress", "done"]).optional()
    })
    .refine((v) => Object.keys(v).length > 0, "Provide at least one field"),
  params: z.object({ id: z.string().length(24) }),
  query: z.object({}).optional()
});
