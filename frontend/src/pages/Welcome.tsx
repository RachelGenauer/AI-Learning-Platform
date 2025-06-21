import { Box, Button, Typography, Container } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state || { name: 'Guest' };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center', fontFamily: '"Amatic SC", cursive' }}>
      <Typography
        variant="h3"
        sx={{
          mb: 5,
          fontFamily: '"Amatic SC", cursive',
        }}
      >
        Welcome, {name}!
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <Button
          variant="outlined"
          color="info"
          size="large"
          startIcon={<HistoryIcon />}
          sx={{
            borderRadius: 4,
            fontSize: 20,
            fontFamily: '"Amatic SC", cursive',
            py: 1.5,
          }}
          onClick={() => navigate('/history')}
        >
          View History
        </Button>

        <Button
          variant="outlined"
          color="info"
          size="large"
          startIcon={<HelpOutlineIcon />}
          sx={{
            borderRadius: 4,
            fontSize: 20,
            fontFamily: '"Amatic SC", cursive',
            py: 1.5,
          }}
          onClick={() => navigate('/newPrompt')}
        >
          New Question
        </Button>
      </Box>
    </Container>
  );
}

