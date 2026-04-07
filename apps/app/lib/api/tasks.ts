import type {
  CreateTaskInput,
  CreateTaskResponse,
  DeleteTaskResponse,
  TasksListResponse,
  UpdateTaskInput,
} from "@workspace/types/use-cases/tasks";
import { api } from "./client";

export async function getTasks(): Promise<TasksListResponse> {
  const response = await api.get<TasksListResponse>("/tasks");

  return {
    ...response,
    data: response.data || [],
  };
}

export async function createTask(
  input: CreateTaskInput
): Promise<CreateTaskResponse> {
  return api.post<CreateTaskResponse>("/tasks", input);
}

export async function updateTask(
  id: string,
  updates: Omit<UpdateTaskInput, "id">
): Promise<CreateTaskResponse> {
  return api.patch<CreateTaskResponse>(`/tasks/${id}`, updates);
}

export async function deleteTask(id: string): Promise<DeleteTaskResponse> {
  return api.delete<DeleteTaskResponse>(`/tasks/${id}`);
}
