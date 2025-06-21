import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ForumIcon from '@mui/icons-material/Forum';

import {
  getAllCategories,
  getSubCategoriesByCategory,
  submitPrompt
} from '../api/prompt';

export default function NewPrompt() {
  const [prompt, setPrompt] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const userId = localStorage.getItem('userId') || '';

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (categoryName) {
      getSubCategoriesByCategory(categoryName)
        .then(setSubCategories)
        .catch(() => setSubCategories([]));
    } else {
      setSubCategories([]);
    }
  }, [categoryName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await submitPrompt({
        user_id: userId,
        prompt,
        category_name: categoryName,
        sub_category_name: subCategoryName,
      });

      setMessage({ type: 'success', text: `AI Response: ${data.response}` });
      setPrompt('');
      setCategoryName('');
      setSubCategoryName('');
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to submit prompt' });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ fontFamily: '"Amatic SC", cursive' }}>
      <Paper elevation={6} sx={{ p: 5, mt: 8, borderRadius: 8 }}>
        <Typography
          variant="h4"
          align="center"
          color="primary"
          mb={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          <ForumIcon fontSize="large" /> Ask Me Anything
        </Typography>

        {message && <Alert severity={message.type}>{message.text}</Alert>}

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
          <FormControl fullWidth>
            <InputLabel>Choose Category</InputLabel>
            <Select
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              label="Choose Category"
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Choose Sub-Category</InputLabel>
            <Select
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              label="Choose Sub-Category"
              required
              disabled={!categoryName}
            >
              {subCategories.map((sub) => (
                <MenuItem key={sub} value={sub}>{sub}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Enter your prompt here..."
            multiline
            minRows={3}
            variant="outlined"
            value={prompt}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
            required
          />

          <Button type="submit" variant="contained" endIcon={<SendIcon />}>Submit</Button>
        </Box>
      </Paper>
    </Container>
  );
}
