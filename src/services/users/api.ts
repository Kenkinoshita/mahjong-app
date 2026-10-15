import { createUserRequestSchema, type CreateUserRequest } from '@common/schemas/users/request/createUserRequestSchema';
import {
  createUserResponseSchema,
  type CreateUserResponse,
} from '@common/schemas/users/response/createUserResponseSchema';
import { httpClient } from '@/services/httpClient';
import { getUsersResponseSchema, type GetUsersResponse } from '@common/schemas/users/response/getUsersResponseSchema';

export async function fetchUsers(): Promise<GetUsersResponse> {
  const { data } = await httpClient.get('/users');
  return getUsersResponseSchema.parse(data);
}

export async function createUser(input: CreateUserRequest): Promise<CreateUserResponse> {
  const body = createUserRequestSchema.parse(input);
  const { data } = await httpClient.post('/users', body);
  return createUserResponseSchema.parse(data);
}
