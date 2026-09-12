import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { isAxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';
import { registerSchema, type RegisterFormValues } from '@/schemas/registerSchema';

export function RegisterPage() {
  const { isRegisterProcessing, register } = useAuth();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = async ({ name, email, password }: RegisterFormValues) => {
    try {
      await register(name, email, password);
      navigate('/overall-results', { replace: true });
    } catch (error) {
      console.error('Register failed:', error);
      if (isAxiosError(error) && error.response?.status === 409) {
        setError('root', { message: 'このメールアドレスは既に登録されています。' });
      } else {
        setError('root', { message: 'アカウント作成に失敗しました。' });
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 440, mx: 'auto', mt: { xs: 4, md: 10 } }}>
      <Paper component="section" elevation={0} sx={{ p: { xs: 3, sm: 5 }, border: 1, borderColor: 'divider' }}>
        <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box>
            <Typography component="h1" variant="h4" gutterBottom>
              アカウント作成
            </Typography>
            <Typography color="text.secondary">アカウント情報を入力してください。</Typography>
          </Box>

          {errors.root?.message && <Alert severity="error">{errors.root.message}</Alert>}

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="text"
                label="名前"
                autoComplete="name"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="email"
                label="メールアドレス"
                autoComplete="email"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="password"
                label="パスワード"
                autoComplete="new-password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            )}
          />
          <Controller
            name="passwordConfirm"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="password"
                label="パスワード（確認）"
                autoComplete="new-password"
                error={Boolean(errors.passwordConfirm)}
                helperText={errors.passwordConfirm?.message}
              />
            )}
          />
          <Button type="submit" variant="contained" size="large" disabled={isRegisterProcessing}>
            {isRegisterProcessing ? '作成中...' : 'アカウントを作成'}
          </Button>
          <Typography align="center" color="text.secondary">
            <Link component={RouterLink} to="/login">
              ログインページに戻る
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
