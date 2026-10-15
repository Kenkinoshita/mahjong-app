import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, it, vi } from 'vitest';
import { RegisterMemberDialog } from '@/components/RegisterMemberDialog';
import { createUser } from '@/services/users/api';
import { useMembers } from '@/hooks/members/useMembers';
import { REACT_QUERY_KEY } from '@/consts/reactQueryKey';

vi.mock('@/services/users/api', () => ({
  createUser: vi.fn(),
  deleteUser: vi.fn(),
  fetchUsers: vi.fn().mockResolvedValue([]),
}));

function MemberRegistration() {
  const { registerMember, isRegisterProcessing } = useMembers();
  return <RegisterMemberDialog registerMember={registerMember} isRegisterProcessing={isRegisterProcessing} />;
}

async function setup() {
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  client.setQueryData(REACT_QUERY_KEY.findMembers, []);
  const invalidate = vi.spyOn(client, 'invalidateQueries');
  render(
    <QueryClientProvider client={client}>
      <MemberRegistration />
    </QueryClientProvider>,
  );
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: '部員登録' }));
  await user.type(screen.getByLabelText('名前', { exact: false }), '木下');
  await user.type(screen.getByLabelText('メールアドレス', { exact: false }), 'member@example.com');
  const passwords = screen.getAllByLabelText(/パスワード/);
  await user.type(passwords[0], 'password123');
  await user.type(passwords[1], 'password123');
  return { user, invalidate };
}

describe('RegisterMemberDialog', () => {
  it('registers the member and refreshes the list', async () => {
    vi.mocked(createUser).mockResolvedValue({ id: 42 });
    const { user, invalidate } = await setup();
    await user.click(screen.getByRole('button', { name: '登録' }));
    await waitFor(() => expect(invalidate).toHaveBeenCalledWith({ queryKey: REACT_QUERY_KEY.findMembers }));
    expect(vi.mocked(createUser).mock.calls.at(-1)?.[0]).toEqual({
      name: '木下',
      email: 'member@example.com',
      password: 'password123',
    });
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });

  it('keeps the form open and explains duplicate email errors', async () => {
    vi.mocked(createUser).mockRejectedValue({ isAxiosError: true, response: { status: 409 } });
    const { user, invalidate } = await setup();
    await user.click(screen.getByRole('button', { name: '登録' }));
    expect((await screen.findByRole('alert')).textContent).toContain('このメールアドレスは既に登録されています。');
    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(invalidate).not.toHaveBeenCalled();
  });
});
