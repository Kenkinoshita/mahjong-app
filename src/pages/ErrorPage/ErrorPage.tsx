import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

type ErrorPageProps = {
  error: Error;
  onReset: () => void;
};

function ErrorPage({ error, onReset }: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 720,
        mx: 'auto',
        mt: { xs: 4, md: 8 },
        p: { xs: 3, md: 6 },
        borderRadius: 4,
        border: 1,
        borderColor: 'divider',
        background: 'linear-gradient(180deg, rgba(211, 47, 47, 0.08) 0%, rgba(211, 47, 47, 0.02) 100%)',
      }}
    >
      <Stack spacing={3} alignItems="flex-start">
        <Box>
          <Typography variant="overline" color="error" sx={{ letterSpacing: '0.18em' }}>
            APPLICATION ERROR
          </Typography>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
            画面の表示に失敗しました
          </Typography>
        </Box>

        <Stack spacing={1}>
          <Typography color="text.secondary">
            通信エラーまたは予期しないデータにより、このページを表示できませんでした。時間をおいて再試行するか、別のページへ移動してください。
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              px: 1.5,
              py: 1,
              borderRadius: 2,
              bgcolor: 'rgba(0, 0, 0, 0.04)',
              fontFamily: 'monospace',
              wordBreak: 'break-word',
            }}
          >
            {error.message || 'Unknown error'}
          </Typography>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button variant="contained" color="error" onClick={onReset}>
            もう一度表示する
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              onReset();
              navigate('/overall-results');
            }}
          >
            総合成績へ戻る
          </Button>
          <Button onClick={() => window.location.reload()}>画面を再読み込み</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default ErrorPage;
