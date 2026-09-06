import { loginSchema } from '@/schemas/loginSchema';

describe('loginSchema', () => {
  it('should parse valid login data', () => {
    const data = {
      email: 'user@example.com',
      password: 'password',
    };

    expect(loginSchema.safeParse(data).success).toBe(true);
  });

  it('should reject an invalid email address', () => {
    const data = {
      email: 'invalid-email',
      password: 'password',
    };

    expect(loginSchema.safeParse(data).success).toBe(false);
  });

  it('should reject an empty password', () => {
    const data = {
      email: 'user@example.com',
      password: '',
    };

    expect(loginSchema.safeParse(data).success).toBe(false);
  });
});
