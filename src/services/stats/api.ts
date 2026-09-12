import { httpClient } from '@/services/httpClient';
import {
  overAllResultResponseSchema,
  type OverAllResultResponse,
} from '@common/schemas/stats/response/overAllResultResponseSchema';

export async function fetchOverallResults(): Promise<OverAllResultResponse> {
  const { data } = await httpClient.get('stats/overall-results');
  const parsedData = overAllResultResponseSchema.parse(data);
  return parsedData;
}
