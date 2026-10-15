import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

type PageCardProps = {
  title: ReactNode;
  action?: ReactNode;
  children: ReactNode;
};

export function PageCard({ title, action, children }: PageCardProps) {
  return (
    <Paper component="section" sx={{ border: 1, borderColor: 'divider', p: { xs: 2, sm: 2.75 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 2.25 }}>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>
      {children}
    </Paper>
  );
}
