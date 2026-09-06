import { httpClient } from '@/services/httpClient';
import { LoginRequestSchema, type LoginRequest } from '@common/schemas/auth/request/LoginRequestSchema';
import {
  CurrentUserResponseSchema,
  type CurrentUserResponse,
} from '@common/schemas/auth/response/CurrentUserResponseSchema';

export async function fetchCurrentUser(): Promise<CurrentUserResponse> {
  const { data } = await httpClient.get('/auth/me');
  return CurrentUserResponseSchema.parse(data);
}

export async function login(input: LoginRequest): Promise<CurrentUserResponse> {
  const body = LoginRequestSchema.parse(input);
  const { data } = await httpClient.post('/auth/login', body);
  return CurrentUserResponseSchema.parse(data);
}

export async function logout(): Promise<void> {
  await httpClient.post('/auth/logout');
}
