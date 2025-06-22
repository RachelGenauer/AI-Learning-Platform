import { Alert, Box } from '@mui/material';

interface AlertMessageProps {
  type: 'success' | 'error';
  text: string;
}

export default function AlertMessage({ type, text }: AlertMessageProps) {
  return (
    <Box mb={2}>
      <Alert severity={type}>{text}</Alert>
    </Box>
  );
}
