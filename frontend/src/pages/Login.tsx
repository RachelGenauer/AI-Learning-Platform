import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

import { loginUser } from '../api/users'; 

export default function Login() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await loginUser(name, phone); 

      localStorage.setItem('userId', user.id_number);
      localStorage.setItem('userPhone', user.phone);

      setMessage({ type: 'success', text: 'Login successful!' });

      setTimeout(() => {
        if (user.phone === '0527184881') {
          navigate('/admin');
        } else {
          navigate('/welcome', { state: { name: user.name } });
        }
      }, 1000);
    } catch (error: any) {
      const detail = error?.response?.data?.detail || error.message;

      if (detail.includes('not found')) {
        setMessage({ type: 'error', text: 'User not found. Please sign up first.' });
      } else if (detail.includes('incorrect')) {
        setMessage({ type: 'error', text: 'Phone number does not match the name.' });
      } else {
        setMessage({ type: 'error', text: detail });
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ fontFamily: '"Amatic SC", cursive' }}>
      <Paper elevation={6} sx={{ p: 5, mt: 8, borderRadius: 8 }}>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
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
            <Link to="/" style={{ color: '#1976d2', textDecoration: 'none' }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
