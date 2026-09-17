import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useLocation, useNavigate } from 'react-router-dom';
import type { SyntheticEvent } from 'react';

const topTabs = [
  { label: '総合成績', path: '/overall-results' },
  { label: '成績詳細', path: '/result-details' },
  { label: 'メンバー', path: '/members' },
  { label: '対局一覧', path: '/matches' },
  { label: '出欠表', path: '/attendance' },
] as const;

export type TopTabValue = (typeof topTabs)[number]['path'];

export function TopTab() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = topTabs.find((tab) => tab.path === location.pathname)?.path ?? false;

  const handleChange = (_event: SyntheticEvent, nextValue: TopTabValue) => {
    navigate(nextValue);
  };

  return (
    <Box component="nav" aria-label="メインメニュー" sx={{ mb: 3 }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        aria-label="トップタブ"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          minHeight: 44,
          '& .MuiTabs-indicator': { display: 'none' },
          '& .MuiTabs-list': { gap: 1 },
          '& .MuiTab-root': {
            minHeight: 44,
            minWidth: 'auto',
            px: 2,
            py: 1.25,
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            bgcolor: 'background.paper',
            color: 'text.primary',
            '&:hover': { borderColor: 'primary.main' },
            '&.Mui-selected': { bgcolor: 'primary.main', color: 'common.white', borderColor: 'primary.main' },
          },
        }}
      >
        {topTabs.map((tab) => (
          <Tab key={tab.path} value={tab.path} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
}
