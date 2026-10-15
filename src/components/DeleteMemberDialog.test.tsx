import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DeleteMemberDialog } from '@/components/DeleteMemberDialog';
import { useMembers } from '@/hooks/members/useMembers';
import { deleteUser } from '@/services/users/api';
import { REACT_QUERY_KEY } from '@/consts/reactQueryKey';

vi.mock('@/services/users/api', () => ({
  fetchUsers: vi.fn().mockResolvedValue([]),
  createUser: vi.fn(),
  deleteUser: vi.fn(),
}));

function MemberDeletion() {
  const { deleteMember, isDeleteProcessing } = useMembers();
  return (
    <DeleteMemberDialog
      member={{ id: 42, name: '木下' }}
      deleteMember={deleteMember}
      isDeleteProcessing={isDeleteProcessing}
    />
  );
}

async function setup() {
  vi.mocked(deleteUser).mockReset();
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  client.setQueryData(REACT_QUERY_KEY.findMembers, []);
  const invalidate = vi.spyOn(client, 'invalidateQueries');
  render(
    <QueryClientProvider client={client}>
      <MemberDeletion />
    </QueryClientProvider>,
  );
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: '木下を削除' }));
  return { user, invalidate };
}

describe('DeleteMemberDialog', () => {
  it('キャンセルすると削除しない', async () => {
    const { user } = await setup();
    await user.click(screen.getByRole('button', { name: 'キャンセル' }));
    expect(deleteUser).not.toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });
  it('削除成功後に一覧を更新する', async () => {
    const { user, invalidate } = await setup();
    vi.mocked(deleteUser).mockResolvedValue(undefined);
    await user.click(screen.getByRole('button', { name: '削除' }));
    await waitFor(() => expect(vi.mocked(deleteUser).mock.calls.at(-1)?.[0]).toBe(42));
    expect(invalidate).toHaveBeenCalledWith({ queryKey: REACT_QUERY_KEY.findMembers });
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });
  it('失敗時はエラーを表示し再試行できる', async () => {
    const { user, invalidate } = await setup();
    vi.mocked(deleteUser).mockRejectedValue(new Error('Failed'));
    await user.click(screen.getByRole('button', { name: '削除' }));
    expect((await screen.findByRole('alert')).textContent).toContain('部員の削除に失敗しました');
    expect(invalidate).not.toHaveBeenCalled();
    expect((screen.getByRole('button', { name: '削除' }) as HTMLButtonElement).disabled).toBe(false);
  });
});
