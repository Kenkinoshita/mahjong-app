import { httpClient } from '@/services/httpClient';
import {
  OverAllResultResponseSchema,
  type OverAllResultResponse,
} from '@common/schemas/stats/response/OverAllResultResponseSchema';

export async function fetchOverallResults(): Promise<OverAllResultResponse> {
  const { data } = await httpClient.get('stats/overall-results');
  const parsedData = OverAllResultResponseSchema.parse(data);
  return parsedData;
}
