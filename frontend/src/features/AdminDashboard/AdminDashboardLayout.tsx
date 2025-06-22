import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import ViewListIcon from '@mui/icons-material/ViewList';
import DashboardCustomizeIcon from '@mui/icons-material/AdminPanelSettings';

import { useAdminDashboard } from './useAdminDashboard';

export default function AdminDashboardLayout() {
  const { goToUsers, goToCategories, goToPrompts } = useAdminDashboard();

  return (
    <Container maxWidth="sm" sx={{ mt: 10, fontFamily: '"Amatic SC", cursive' }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 8 }}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
          <DashboardCustomizeIcon sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
          <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Admin Dashboard
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<GroupIcon />}
            onClick={goToUsers}
            sx={buttonStyles}
          >
            Manage Users
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<CategoryIcon />}
            onClick={goToCategories}
            sx={buttonStyles}
          >
            Manage Categories
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<ViewListIcon />}
            onClick={goToPrompts}
            sx={buttonStyles}
          >
            View Prompts
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

const buttonStyles = {
  borderColor: '#1976d2',
  color: '#1976d2',
  borderRadius: 4,
  fontWeight: 'bold',
  fontSize: '24px',
  justifyContent: 'center',
  textTransform: 'none',
  py: 2,
};
