import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { DeleteIcon } from '@/icons/DeleteIcon';
import type { useMembers } from '@/hooks/members/useMembers';

type Props = Pick<ReturnType<typeof useMembers>, 'deleteMember' | 'isDeleteProcessing'> & {
  member: { id: number; name: string };
};

export function DeleteMemberDialog({ member, deleteMember, isDeleteProcessing }: Props) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const close = () => {
    if (!isDeleteProcessing) setOpen(false);
  };
  const onDelete = async () => {
    setError('');
    try {
      await deleteMember(member.id);
      setOpen(false);
    } catch {
      setError('部員の削除に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <>
      <IconButton
        color="error"
        aria-label={`${member.name}を削除`}
        disabled={isDeleteProcessing}
        onClick={() => {
          setError('');
          setOpen(true);
        }}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={close} aria-labelledby={`delete-member-title-${member.id}`}>
        <DialogTitle id={`delete-member-title-${member.id}`}>部員の削除</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <DialogContentText>{member.name}さんを削除しますか？この操作は取り消せません。</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} disabled={isDeleteProcessing}>
            キャンセル
          </Button>
          <Button color="error" variant="contained" onClick={onDelete} disabled={isDeleteProcessing}>
            {isDeleteProcessing ? '削除中...' : '削除'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
