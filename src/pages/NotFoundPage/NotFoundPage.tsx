import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
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
        background: 'linear-gradient(180deg, rgba(25, 118, 210, 0.08) 0%, rgba(25, 118, 210, 0.02) 100%)',
      }}
    >
      <Stack spacing={3} alignItems="flex-start">
        <Box>
          <Typography variant="overline" color="primary" sx={{ letterSpacing: '0.18em' }}>
            PAGE NOT FOUND
          </Typography>
          <Typography component="h1" variant="h3" sx={{ fontWeight: 700 }}>
            404
          </Typography>
        </Box>

        <Stack spacing={1}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            お探しのページは見つかりませんでした
          </Typography>
          <Typography color="text.secondary">
            URL が変わったか、存在しないページへアクセスしている可能性があります。
            総合成績ページへ戻って、目的の画面からもう一度移動してください。
          </Typography>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button variant="contained" onClick={() => navigate('/overall-results')}>
            総合成績へ戻る
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            ひとつ前に戻る
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default NotFoundPage;
