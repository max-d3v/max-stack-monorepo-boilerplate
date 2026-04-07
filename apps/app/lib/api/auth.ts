import type {
  AuthResponse,
  LoginInput,
  LoginResponse,
  LogoutResponse,
  RegisterInput,
  RegisterResponse,
} from "@workspace/types/use-cases/account";
import { api } from "./client";

export async function getAuthUser(): Promise<AuthResponse> {
  return api.get<AuthResponse>("/auth/me");
}

export async function login(input: LoginInput): Promise<LoginResponse> {
  return api.post<LoginResponse>("/auth/login", input);
}

export async function register(
  input: RegisterInput
): Promise<RegisterResponse> {
  return api.post<RegisterResponse>("/auth/register", input);
}

export async function logout(): Promise<LogoutResponse> {
  return api.post<LogoutResponse>("/auth/logout");
}
