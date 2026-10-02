import { httpClient } from '@/services/httpClient';
import { getUsersResponseSchema, type GetUsersResponse } from '@common/schemas/users/response/getUsersResponseSchema';

export async function fetchUsers(): Promise<GetUsersResponse> {
  const { data } = await httpClient.get('/users');
  return getUsersResponseSchema.parse(data);
}
