import { useEffect, useState } from 'react';
import { getPromptHistoryByUser } from '../../api/prompt';
import { Prompt } from '../../types';

export function useHistory() {
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

  return { history, loading, error };
}
