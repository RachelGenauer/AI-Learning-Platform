import { Container, Typography, Box, Button, Paper } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import ViewListIcon from '@mui/icons-material/ViewList';
import DashboardCustomizeIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 10, fontFamily: '"Amatic SC", cursive' }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 8 }}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
          <DashboardCustomizeIcon sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
          <Typography
            variant="h3"
            sx={{ color: 'primary.main', fontWeight: 'bold' }}
          >
            Admin Dashboard
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<GroupIcon />}
            onClick={() => navigate('/admin/users')}
            sx={{
              borderColor: '#1976d2',
              color: '#1976d2',
              borderRadius: 4,
              fontWeight: 'bold',
              fontSize: '24px',
              justifyContent: 'center',
              textTransform: 'none',
              py: 2,
            }}
          >
            Manage Users
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<CategoryIcon />}
            onClick={() => navigate('/admin/categories')}
            sx={{
              borderColor: '#1976d2',
              color: '#1976d2',
              borderRadius: 4,
              fontWeight: 'bold',
              fontSize: '24px',
              justifyContent: 'center',
              textTransform: 'none',
              py: 2,
            }}
          >
            Manage Categories
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<ViewListIcon />}
            onClick={() => navigate('/admin/prompts')}
            sx={{
              borderColor: '#1976d2',
              color: '#1976d2',
              borderRadius: 4,
              fontWeight: 'bold',
              fontSize: '24px',
              justifyContent: 'center',
              textTransform: 'none',
              py: 2,
            }}
          >
            View Prompts
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
