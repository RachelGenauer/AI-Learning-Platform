import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useViewPrompts } from './useViewPrompts';

export default function ViewPromptsLayout() {
  const { prompts, loading, error } = useViewPrompts();

  return (
    <Container maxWidth="md" sx={{ fontFamily: '"Amatic SC", cursive', mt: 5 }}>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        href="/admin"
        sx={{ mb: 3, backgroundColor: '#1976d2' }}
      >
        Return to Admin Dashboard
      </Button>

      <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ color: '#1976d2', fontSize: '36px', fontWeight: 'bold' }}
        >
          <VisibilityIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          All Prompts
        </Typography>

        {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />}

        {!loading && error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#1976d2', fontWeight: 'bold' }}>User ID</TableCell>
                <TableCell sx={{ color: '#1976d2', fontWeight: 'bold' }}>Prompt</TableCell>
                <TableCell sx={{ color: '#1976d2', fontWeight: 'bold' }}>Response</TableCell>
                <TableCell sx={{ color: '#1976d2', fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ color: '#1976d2', fontWeight: 'bold' }}>Sub-Category</TableCell>
                <TableCell sx={{ color: '#1976d2', fontWeight: 'bold' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prompts.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.user_id}</TableCell>
                  <TableCell>{item.prompt}</TableCell>
                  <TableCell>{item.response}</TableCell>
                  <TableCell>{item.category_name}</TableCell>
                  <TableCell>{item.sub_category_name}</TableCell>
                  <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
}
