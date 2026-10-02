import { useSuspenseQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEY } from '@/consts/reactQueryKey';
import { fetchUsers } from '@/services/users/api';

export function useMembers() {
  const { data } = useSuspenseQuery({
    queryKey: REACT_QUERY_KEY.findMembers,
    queryFn: fetchUsers,
  });

  return { data };
}
