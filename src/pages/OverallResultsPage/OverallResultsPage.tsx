import { Suspense } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useOverallResultsQuery, type OverallResult } from '@/services/stats';
import { Loading } from '@/components/Loading';

const columns: Array<{ key: keyof OverallResult; label: string }> = [
  { key: 'rank', label: '順位' },
  { key: 'name', label: '名前' },
  { key: 'point', label: 'ポイント' },
  { key: 'gameCount', label: '試合数' },
  { key: 'averageRank', label: '平均順位' },
  { key: 'topRate', label: 'トップ率' },
  { key: 'avoidLastRate', label: 'ラス回避率' },
  { key: 'rentaiRate', label: '連帯率' },
];

function OverallResultsTable() {
  const { data: rows } = useOverallResultsQuery();

  if (rows.length === 0) {
    return <Typography color="text.secondary">データがありません</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="総合成績テーブル">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={`${row.rank}-${row.name}`}>
              {columns.map((column) => (
                <TableCell key={column.key}>{row[column.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function OverallResultsPage() {
  return (
    <>
      <Typography component="h1" variant="h5" gutterBottom>
        総合成績
      </Typography>
      <Suspense fallback={<Loading />}>
        <OverallResultsTable />
      </Suspense>
    </>
  );
}

export default OverallResultsPage;
