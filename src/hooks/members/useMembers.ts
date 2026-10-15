import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEY } from '@/consts/reactQueryKey';
import { createUser, deleteUser, fetchUsers } from '@/services/users/api';

import { useDeleteQueryCache } from '@/hooks/useDeleteQueryCache';

export function useMembers() {
  const { data } = useSuspenseQuery({
    queryKey: REACT_QUERY_KEY.findMembers,
    queryFn: fetchUsers,
  });

  const { deleteCache } = useDeleteQueryCache({ queryKey: REACT_QUERY_KEY.findMembers });
  const { mutateAsync: registerMember, isPending: isRegisterProcessing } = useMutation({
    mutationFn: createUser,
    onSuccess: deleteCache,
  });

  const { mutateAsync: deleteMember, isPending: isDeleteProcessing } = useMutation({
    mutationFn: deleteUser,
    onSuccess: deleteCache,
  });

  return { data, registerMember, isRegisterProcessing, deleteMember, isDeleteProcessing };
}
