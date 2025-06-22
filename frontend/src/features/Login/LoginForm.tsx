import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';

import { useLogin } from './useLogin';

export default function LoginForm() {
  const {
    name,
    setName,
    phone,
    setPhone,
    handleSubmit,
    message,
  } = useLogin();

  return (
    <Container maxWidth="sm" sx={{ fontFamily: '"Amatic SC", cursive' }}>
      <Paper elevation={6} sx={{ p: 5, mt: 8, borderRadius: 8 }}>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h3" align="center" sx={{ color: 'primary.main' }}>
              <LoginIcon fontSize="large" sx={{ verticalAlign: 'middle', mr: 1 }} />
              LOG IN
            </Typography>

            {message && <Alert severity={message.type}>{message.text}</Alert>}

            <Box display="flex" alignItems="flex-end">
              <PersonIcon sx={{ mr: 1 }} color="action" />
              <TextField
                label="Full Name"
                variant="standard"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Box>

            <Box display="flex" alignItems="flex-end">
              <PhoneAndroidIcon sx={{ mr: 1 }} color="action" />
              <TextField
                label="Phone"
                variant="standard"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Box>

            <Button type="submit" variant="contained" size="large" startIcon={<LoginIcon />}>
              Log In
            </Button>

            <Typography variant="body1" align="center" sx={{ mt: 2 }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#1976d2', textDecoration: 'none' }}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
