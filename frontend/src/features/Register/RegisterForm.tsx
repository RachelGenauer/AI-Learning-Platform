import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Link } from 'react-router-dom';

import { useRegister } from './useRegister';
import AlertMessage from '../../components/AlertMessage';

export default function RegisterForm() {
  const {
    idNumber,
    setIdNumber,
    name,
    setName,
    phone,
    setPhone,
    handleSubmit,
    message,
  } = useRegister();

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
            sx={{
              color: 'primary.main',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <HowToRegIcon fontSize="large" />
            SIGN UP
          </Typography>

          {message && <AlertMessage type={message.type} text={message.text} />}

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

          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<HowToRegIcon />}
          >
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
