import { useEffect, useState } from 'react';
import { getAllPrompts } from '../../api/prompt';
import { Prompt } from '../../types';

export function useViewPrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPrompts = async () => {
      try {
        const data = await getAllPrompts();
        setPrompts(data);
      } catch (err) {
        setError('Failed to load prompts.');
      } finally {
        setLoading(false);
      }
    };

    loadPrompts();
  }, []);

  return { prompts, loading, error };
}
