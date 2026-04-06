import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchOverallResults } from '@/services/stats/api';
import { REACT_QUERY_KEY } from '@/consts/reactQueryKey';

export function useOverallResultsQuery() {
  const { data } = useSuspenseQuery({
    queryKey: REACT_QUERY_KEY.findOverallResults,
    queryFn: fetchOverallResults,
  });

  return { data };
}
