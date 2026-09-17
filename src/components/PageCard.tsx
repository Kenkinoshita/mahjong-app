import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

type PageCardProps = {
  title: string;
  children: ReactNode;
};

export function PageCard({ title, children }: PageCardProps) {
  return (
    <Paper component="section" sx={{ border: 1, borderColor: 'divider', p: { xs: 2, sm: 2.75 } }}>
      <Typography component="h1" variant="h5" sx={{ mb: 2.25 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}
