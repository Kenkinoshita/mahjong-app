import { httpClient } from '@/services/httpClient';
import { loginRequestSchema, type LoginRequest } from '@common/schemas/auth/request/loginRequestSchema';
import { registerRequestSchema, type RegisterRequest } from '@common/schemas/auth/request/registerRequestSchema';
import {
  currentUserResponseSchema,
  type CurrentUserResponse,
} from '@common/schemas/auth/response/currentUserResponseSchema';

export async function fetchCurrentUser(): Promise<CurrentUserResponse> {
  const { data } = await httpClient.get('/auth/me');
  return currentUserResponseSchema.parse(data);
}

export async function login(input: LoginRequest): Promise<CurrentUserResponse> {
  const body = loginRequestSchema.parse(input);
  const { data } = await httpClient.post('/auth/login', body);
  return currentUserResponseSchema.parse(data);
}

export async function logout(): Promise<void> {
  await httpClient.post('/auth/logout');
}

export async function register(input: RegisterRequest): Promise<CurrentUserResponse> {
  const body = registerRequestSchema.parse(input);
  const { data } = await httpClient.post('/auth/register', body);
  return currentUserResponseSchema.parse(data);
}
