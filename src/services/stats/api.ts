// import { httpClient } from '@/services/httpClient';
import type { OverallResult } from '@/services/stats/types';

export async function fetchOverallResults(): Promise<OverallResult[]> {
  // const { data } = await httpClient.get<OverallResult[]>('/api/overall-results');
  const data = [
    {
      rank: 1,
      name: 'Player 1',
      point: 100,
      gameCount: 10,
      averageRank: 1.5,
      topRate: 0.5,
      avoidLastRate: 0.3,
      rentaiRate: 0.7,
    },
  ];
  return data;
}
