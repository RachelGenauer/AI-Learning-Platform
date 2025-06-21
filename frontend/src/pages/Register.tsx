import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/users';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
} from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function Register() {
  const [idNumber, setIdNumber] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ id_number: idNumber, name, phone });
      setMessage({ type: 'success', text: 'Registration successful!' });

      // שמירה ב-localStorage
      localStorage.setItem("userId", idNumber);
      localStorage.setItem("userName", name);
      localStorage.setItem("userPhone", phone);

      setTimeout(() => {
        navigate('/welcome', { state: { name } });
      }, 1000);
    } catch (error: any) {
      let errorText = 'Registration failed.';
      const status = error?.response?.status;
      const detail = error?.response?.data?.detail;

      if (status === 400) {
        if (detail?.includes('already exists')) {
          errorText = 'User already exists. Try logging in instead.';
        } else if (detail?.includes('missing')) {
          errorText = 'Missing required fields. Please fill out all fields.';
        } else {
          errorText = detail || 'Bad request.';
        }
      } else if (status === 404) {
        errorText = 'Server not found. Please try again later.';
      } else if (status === 500) {
        errorText = 'Server error occurred. Please try again soon.';
      } else if (status === 0 || !status) {
        errorText = 'Could not connect to the server. Check your internet connection.';
      }

      setMessage({ type: 'error', text: errorText });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ fontFamily: '"Amatic SC", cursive' }}>
      <Paper elevation={6} sx={{ p: 5, mt: 8, borderRadius: 8 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{ color: 'primary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}
          >
            <HowToRegIcon fontSize="large" />
            SIGN UP
          </Typography>

          {message && <Alert severity={message.type}>{message.text}</Alert>}

          <Box display="flex" alignItems="flex-end">
            <BadgeIcon sx={{ mr: 1 }} color="action" />
            <TextField
              label="ID Number"
              variant="standard"
              fullWidth
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              required
            />
          </Box>

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

          <Button type="submit" variant="contained" size="large" startIcon={<HowToRegIcon />}>
            Sign Up
          </Button>

          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
              Log In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
