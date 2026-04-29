import { z } from "zod";
import type { TaskRawObject } from "../repository/tasks";

export type TasksListResponse = {
  data: TaskRawObject[];
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
};
export type Task = TaskRawObject;

export type CreateTaskResponse = TaskRawObject;
export type DeleteTaskResponse = { deleted: boolean };

export const getUserTasksInputSchema = z.object({
  userId: z.string().uuid(),
});

export const createTaskInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional(),
});

export const updateTaskInputSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  status: z.enum(["todo", "in-progress", "completed", "cancelled"]).optional(),
  dueDate: z.coerce.date().nullable().optional(),
  completedAt: z.coerce.date().nullable().optional(),
});

export const updateTaskSchema = z.object({
  userId: z.string().uuid(),
  taskId: z.string().uuid(),
  data: updateTaskInputSchema.omit({ id: true }),
});

export const createTaskSchema = z.object({
  userId: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().nullable().optional(),
});

export const completeTaskSchema = z.object({
  userId: z.string().uuid(),
  taskId: z.string().uuid(),
});

export const deleteTaskSchema = z.object({
  userId: z.string().uuid(),
  taskId: z.string().uuid(),
});

export const deleteTaskInputSchema = z.object({
  id: z.string().uuid(),
});

export type GetUserTasksInput = z.infer<typeof getUserTasksInputSchema>;
export type CreateTaskInput = z.infer<typeof createTaskInputSchema>;
export type CreateTask = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskInputSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
export type CompleteTask = z.infer<typeof completeTaskSchema>;
export type DeleteTaskInput = z.infer<typeof deleteTaskInputSchema>;
export type DeleteTask = z.infer<typeof deleteTaskSchema>;
