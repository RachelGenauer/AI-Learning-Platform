import { Container, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import  PageTitle  from '../components/PageTitle';
import { UsersLayout } from '../features/users/UsersLayout';

export default function ManageUsers() {
  return (
    <Container maxWidth="md" sx={{ fontFamily: 'Amatic SC', mt: 5 }}>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        href="/admin"
        sx={{ mb: 3 }}
      >
        Return to Admin Dashboard
      </Button>

      <PageTitle icon={<ManageAccountsIcon />} title="Manage Users" />

      <UsersLayout />
    </Container>
  );
}
