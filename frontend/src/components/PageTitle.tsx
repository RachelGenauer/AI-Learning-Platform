import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface PageTitleProps {
  icon?: ReactNode;
  title: string;
}

export default function PageTitle({ icon, title }: PageTitleProps) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={4}>
      {icon}
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        {title}
      </Typography>
    </Box>
  );
}
