import { fetchUsers } from '@/services/users/api';
import { httpClient } from '@/services/httpClient';

vi.mock('@/services/httpClient', () => ({
  httpClient: { get: vi.fn() },
}));

beforeEach(() => vi.resetAllMocks());

describe('users API', () => {
  it('部員一覧を取得する', async () => {
    const users = [{ id: 1, name: '木下', email: 'kinoshita@example.com' }];
    vi.mocked(httpClient.get).mockResolvedValue({ data: users });

    await expect(fetchUsers()).resolves.toEqual(users);
    expect(httpClient.get).toHaveBeenCalledWith('/users');
  });

  it('不正なレスポンスを拒否する', async () => {
    vi.mocked(httpClient.get).mockResolvedValue({ data: [{ id: 1, name: '木下' }] });

    await expect(fetchUsers()).rejects.toThrow();
  });
});
