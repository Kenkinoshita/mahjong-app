import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';
import { loginSchema, type LoginFormValues } from '@/schemas/loginSchema';

type LoginLocationState = {
  from?: {
    pathname?: string;
  };
};

export function LoginPage() {
  const { isLoginProcessing, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const from = (location.state as LoginLocationState | null)?.from?.pathname ?? '/overall-results';

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch {
      setError('root', {
        message: 'ログインに失敗しました。メールアドレスとパスワードを確認してください。',
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 440, mx: 'auto', mt: { xs: 4, md: 10 } }}>
      <Paper component="section" elevation={0} sx={{ p: { xs: 3, sm: 5 }, border: 1, borderColor: 'divider' }}>
        <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box>
            <Typography component="h1" variant="h4" gutterBottom>
              ログイン
            </Typography>
            <Typography color="text.secondary">アカウント情報を入力してください。</Typography>
          </Box>

          {errors.root?.message && <Alert severity="error">{errors.root.message}</Alert>}

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
                autoComplete="current-password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            )}
          />
          <Button type="submit" variant="contained" size="large" disabled={isLoginProcessing}>
            {isLoginProcessing ? 'ログイン中...' : 'ログイン'}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
