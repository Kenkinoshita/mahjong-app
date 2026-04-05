import { useState, type SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

const topTabs = ['総合成績', '成績詳細', 'メンバー', '対局一覧', '出欠表'] as const;

export type TopTabValue = (typeof topTabs)[number];

export function TopTab() {
  const [activeTab, setActiveTab] = useState<TopTabValue>(topTabs[0]);

  const handleChange = (_event: SyntheticEvent, nextValue: TopTabValue) => {
    setActiveTab(nextValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper', px: 2, pt: 1 }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="トップタブ"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {topTabs.map((tab) => (
            <Tab key={tab} value={tab} label={tab} />
          ))}
        </Tabs>
      </Box>
      <Box component="main" sx={{ px: 2, py: 3 }}>
        <Typography component="h1" variant="h5">
          {activeTab}
        </Typography>
      </Box>
    </Box>
  );
}
