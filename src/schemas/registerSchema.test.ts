import { registerSchema } from '@/schemas/registerSchema';

describe('registerSchema', () => {
  it('should parse valid register data', () => {
    const data = {
      name: 'テスト太郎',
      email: 'user@example.com',
      password: 'password123',
      passwordConfirm: 'password123',
    };

    expect(registerSchema.safeParse(data).success).toBe(true);
  });

  it('should reject an empty name', () => {
    const data = {
      name: '',
      email: 'user@example.com',
      password: 'password123',
      passwordConfirm: 'password123',
    };

    expect(registerSchema.safeParse(data).success).toBe(false);
  });

  it('should reject an invalid email address', () => {
    const data = {
      name: 'テスト太郎',
      email: 'invalid-email',
      password: 'password123',
      passwordConfirm: 'password123',
    };

    expect(registerSchema.safeParse(data).success).toBe(false);
  });

  it('should reject a password shorter than 8 characters', () => {
    const data = {
      name: 'テスト太郎',
      email: 'user@example.com',
      password: 'short1',
      passwordConfirm: 'short1',
    };

    expect(registerSchema.safeParse(data).success).toBe(false);
  });

  it('should reject when password and passwordConfirm do not match', () => {
    const data = {
      name: 'テスト太郎',
      email: 'user@example.com',
      password: 'password123',
      passwordConfirm: 'password456',
    };

    const result = registerSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path.includes('passwordConfirm'))).toBe(true);
    }
  });
});
