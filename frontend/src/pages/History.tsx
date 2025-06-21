import { useEffect, useState } from 'react';
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

import { getPromptHistoryByUser } from '../api/prompt';
import { Prompt } from '../types';

export default function History() {
  const userId = localStorage.getItem('userId');
  const [history, setHistory] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) {
        setError('No user ID found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const data = await getPromptHistoryByUser(userId);
        setHistory(data);
        setError('');
      } catch (err: any) {
        setError('Failed to load history.');
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

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

        {!loading && error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && history.length === 0 && (
          <Alert severity="info" sx={{ mt: 3 }}>
            No history found.
          </Alert>
        )}

        {!loading && !error && history.length > 0 && (
          <List sx={{ textAlign: 'center' }}>
            {history.map((item, index) => (
              <Box key={index} textAlign="center" mb={3}>
                <ListItem sx={{ display: 'block' }}>
                  <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={0.5}>
                    <QuestionAnswerIcon fontSize="small" color="action" />
                    <Typography variant="body1" sx={{ textAlign: 'center' }}>
                      <strong style={{ color: '#1976d2' }}>Prompt:</strong> {item.prompt}
                    </Typography>
                  </Box>

                  <Typography variant="body1" mb={0.5} sx={{ textAlign: 'center' }}>
                    <strong style={{ color: '#1976d2' }}>Response:</strong> {item.response}
                  </Typography>

                  <Typography variant="body1" mb={0.5} sx={{ textAlign: 'center' }}>
                    <strong style={{ color: '#1976d2' }}>Category:</strong> {item.category_name}
                  </Typography>

                  <Typography variant="body1" mb={0.5} sx={{ textAlign: 'center' }}>
                    <strong style={{ color: '#1976d2' }}>Sub-Category:</strong> {item.sub_category_name}
                  </Typography>

                  <Typography variant="body1" sx={{ textAlign: 'center' }}>
                    <strong style={{ color: '#1976d2' }}>Date:</strong> {new Date(item.created_at).toLocaleString()}
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

