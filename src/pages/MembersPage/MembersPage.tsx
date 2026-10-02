import { PageCard } from '@/components/PageCard';
import { Loading } from '@/components/Loading';
import { useMembers } from '@/hooks/members/useMembers';
import { Suspense } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

function MembersTable() {
  const { data: members } = useMembers();

  if (members.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ textAlign: 'center', py: 5 }}>
        部員がいません
      </Typography>
    );
  }

  return (
    <TableContainer>
      <Table aria-label="部員一覧">
        <TableHead>
          <TableRow>
            <TableCell>名前</TableCell>
            <TableCell>メールアドレス</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member) => (
            <TableRow hover key={member.id}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function MembersPage() {
  return (
    <PageCard title="部員">
      <Suspense fallback={<Loading />}>
        <MembersTable />
      </Suspense>
    </PageCard>
  );
}

export default MembersPage;
