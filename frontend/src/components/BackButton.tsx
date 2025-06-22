import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface BackButtonProps {
  href: string;
  text?: string;
}

export default function BackButton({ href, text = 'Back' }: BackButtonProps) {
  return (
    <Button
      variant="contained"
      startIcon={<ArrowBackIcon />}
      href={href}
      sx={{ mb: 3 }}
    >
      {text}
    </Button>
  );
}
