import { httpClient } from '@/services/httpClient';
import type { OverallResult } from '@/services/stats/types';

export async function fetchOverallResults(): Promise<OverallResult[]> {
  const { data } = await httpClient.get<OverallResult[]>('stats/overall-results');
  return data;
}
