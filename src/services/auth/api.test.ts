import { fetchCurrentUser, login, logout } from '@/services/auth/api';
import { httpClient } from '@/services/httpClient';

vi.mock('@/services/httpClient', () => ({
  httpClient: { get: vi.fn(), post: vi.fn() },
}));

beforeEach(() => vi.resetAllMocks());

describe('auth API', () => {
  it('ログイン情報を送信して成功レスポンスを返す', async () => {
    vi.mocked(httpClient.post).mockResolvedValue({ data: { results: 'success' } });
    const input = { email: 'user@example.com', password: 'password' };
    await expect(login(input)).resolves.toEqual({ results: 'success' });
    expect(httpClient.post).toHaveBeenCalledWith('/auth/login', input);
  });

  it('不正なログイン情報は送信しない', async () => {
    await expect(login({ email: 'invalid', password: '' })).rejects.toThrow();
    expect(httpClient.post).not.toHaveBeenCalled();
  });

  it('現在のユーザーを取得する', async () => {
    vi.mocked(httpClient.get).mockResolvedValue({ data: { userId: 1 } });
    await expect(fetchCurrentUser()).resolves.toEqual({ userId: 1 });
    expect(httpClient.get).toHaveBeenCalledWith('/auth/me');
  });

  it('不正な現在ユーザーレスポンスを拒否する', async () => {
    vi.mocked(httpClient.get).mockResolvedValue({ data: { userId: null } });
    await expect(fetchCurrentUser()).rejects.toThrow();
  });

  it('ログアウトを送信する', async () => {
    vi.mocked(httpClient.post).mockResolvedValue({ data: { results: 'success' } });
    await expect(logout()).resolves.toEqual({ results: 'success' });
    expect(httpClient.post).toHaveBeenCalledWith('/auth/logout');
  });

  it('不正な成功レスポンスを拒否する', async () => {
    vi.mocked(httpClient.post).mockResolvedValue({ data: { results: 'failure' } });
    await expect(logout()).rejects.toThrow();
  });

  it('APIエラーを呼び出し元へ伝える', async () => {
    const error = new Error('Unauthorized');
    vi.mocked(httpClient.post).mockRejectedValue(error);
    await expect(login({ email: 'user@example.com', password: 'password' })).rejects.toBe(error);
    await expect(logout()).rejects.toBe(error);
    vi.mocked(httpClient.get).mockRejectedValue(error);
    await expect(fetchCurrentUser()).rejects.toBe(error);
  });
});
