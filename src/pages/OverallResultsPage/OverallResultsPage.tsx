import { Suspense, useMemo, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import { type OverallResult } from '@/services/stats';
import { Loading } from '@/components/Loading';
import { useOverallResults } from '@/pages/OverallResultsPage/useOverallResults';

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
  const { data: rows } = useOverallResults();
  const [sortKey, setSortKey] = useState<keyof OverallResult>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedRows = useMemo(() => {
    const nextRows = [...rows];

    nextRows.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const compared = String(aValue).localeCompare(String(bValue), 'ja');
      return sortOrder === 'asc' ? compared : -compared;
    });

    return nextRows;
  }, [rows, sortKey, sortOrder]);

  const handleSort = (key: keyof OverallResult) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortKey(key);
    setSortOrder('asc');
  };

  if (rows.length === 0) {
    return <Typography color="text.secondary">データがありません</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="総合成績テーブル">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key} sortDirection={sortKey === column.key ? sortOrder : false}>
                <TableSortLabel
                  active={sortKey === column.key}
                  direction={sortKey === column.key ? sortOrder : 'asc'}
                  onClick={() => handleSort(column.key)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row) => (
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
