import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  Divider,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import { useHistory } from './useHistory';

export default function HistoryLayout() {
  const { history, loading, error } = useHistory();

  const noHistory = !loading && history.length === 0;

  return (
    <Container maxWidth="sm" sx={{ fontFamily: '"Amatic SC", cursive' }}>
      <Paper elevation={6} sx={{ p: 5, mt: 8, borderRadius: 8 }}>
        <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={2}>
          <HistoryIcon fontSize="large" color="primary" />
          <Typography variant="h4" color="primary" sx={{ textAlign: 'center' }}>
            Prompt History
          </Typography>
        </Box>

        {loading && <CircularProgress sx={{ mt: 4, mx: 'auto', display: 'block' }} />}

        {!loading && error && history.length > 0 && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        {noHistory && (
          <Typography variant="body1" color="textSecondary" align="center" mt={4}>
            No prompt history found.
          </Typography>
        )}

        {!loading && !error && history.length > 0 && (
          <List sx={{ textAlign: 'center' }}>
            {history.map((item, index) => (
              <Box key={index} textAlign="center" mb={3}>
                <ListItem sx={{ display: 'block' }}>
                  <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={0.5}>
                    <QuestionAnswerIcon fontSize="small" color="action" />
                    <Typography variant="body1">
                      <strong style={{ color: '#1976d2' }}>Prompt:</strong> {item.prompt}
                    </Typography>
                  </Box>

                  <Typography variant="body1" mb={0.5}>
                    <strong style={{ color: '#1976d2' }}>Response:</strong> {item.response}
                  </Typography>

                  <Typography variant="body1" mb={0.5}>
                    <strong style={{ color: '#1976d2' }}>Category:</strong> {item.category_name}
                  </Typography>

                  <Typography variant="body1" mb={0.5}>
                    <strong style={{ color: '#1976d2' }}>Sub-Category:</strong> {item.sub_category_name}
                  </Typography>

                  <Typography variant="body1">
                    <strong style={{ color: '#1976d2' }}>Date:</strong>{' '}
                    {new Date(item.created_at).toLocaleString()}
                  </Typography>
                </ListItem>
                <Divider sx={{ my: 2 }} />
              </Box>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
}
