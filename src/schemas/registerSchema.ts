import z from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(1, '名前を入力してください。'),
    email: z.email('メールアドレスの形式が正しくありません。'),
    password: z.string().min(8, 'パスワードは8文字以上で入力してください。'),
    passwordConfirm: z.string().min(1, '確認用パスワードを入力してください。'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'パスワードが一致しません。',
    path: ['passwordConfirm'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
