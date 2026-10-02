import { PageCard } from '@/components/PageCard';
import { Loading } from '@/components/Loading';
import { useMembers } from '@/hooks/members/useMembers';
import { Suspense } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

function MembersContent() {
  const { data: members } = useMembers();

  return (
    <PageCard
      title={
        <>
          部員
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              ml: 1,
              px: 1.25,
              py: 0.25,
              borderRadius: '999px',
              bgcolor: 'primary.main',
              color: 'common.white',
              fontSize: '0.75rem',
              fontWeight: 700,
              verticalAlign: 'middle',
            }}
          >
            {members.length}人
          </Box>
        </>
      }
    >
      {members.length === 0 ? (
        <Typography color="text.secondary" sx={{ textAlign: 'center', py: 5 }}>
          部員がいません
        </Typography>
      ) : (
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
      )}
    </PageCard>
  );
}

function MembersPage() {
  return (
    <Suspense
      fallback={
        <PageCard title="部員">
          <Loading />
        </PageCard>
      }
    >
      <MembersContent />
    </Suspense>
  );
}

export default MembersPage;
