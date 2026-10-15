import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import {
  registerMemberSchema,
  registerMemberDefaultValues,
  type RegisterMemberFormValues,
} from '@/schemas/registerMemberSchema';
import { useThrowError } from '@/hooks/useThrowError';
import type { useMembers } from '@/hooks/members/useMembers';

type RegisterMemberDialogProps = Pick<ReturnType<typeof useMembers>, 'registerMember' | 'isRegisterProcessing'>;

export function RegisterMemberDialog({ registerMember, isRegisterProcessing }: RegisterMemberDialogProps) {
  const [open, setOpen] = useState(false);
  const { throwError } = useThrowError();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<RegisterMemberFormValues>({
    resolver: zodResolver(registerMemberSchema),
    defaultValues: registerMemberDefaultValues,
  });
  const close = () => {
    if (!isRegisterProcessing) setOpen(false);
  };
  const onSubmit = async ({ name, email, password }: RegisterMemberFormValues) => {
    try {
      await registerMember({ name, email, password });
    } catch (error) {
      console.error('Register member failed:', error);
      if (isAxiosError(error) && error.response?.status === 409) {
        setError('root', { message: 'このメールアドレスは既に登録されています。' });
      } else {
        throwError(error);
      }
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          reset();
          setOpen(true);
        }}
      >
        部員登録
      </Button>
      <Dialog open={open} onClose={close} fullWidth maxWidth="sm" aria-labelledby="register-member-title">
        <DialogTitle id="register-member-title">部員登録</DialogTitle>
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
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
                    disabled={isRegisterProcessing}
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
                    disabled={isRegisterProcessing}
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
                    disabled={isRegisterProcessing}
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
                    disabled={isRegisterProcessing}
                    error={Boolean(errors.passwordConfirm)}
                    helperText={errors.passwordConfirm?.message}
                  />
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={close} disabled={isRegisterProcessing}>
              キャンセル
            </Button>
            <Button type="submit" variant="contained" disabled={isRegisterProcessing}>
              {isRegisterProcessing ? '登録中...' : '登録'}
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </>
  );
}
