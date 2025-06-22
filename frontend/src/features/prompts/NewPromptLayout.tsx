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

import { useNewPrompt } from './useNewPrompt';

export default function NewPromptLayout() {
  const {
    prompt,
    setPrompt,
    categoryName,
    setCategoryName,
    subCategoryName,
    setSubCategoryName,
    categories,
    subCategories,
    message,
    aiResponse,
    handleSubmit
  } = useNewPrompt();

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

        {message && message.type === 'error' && (
          <Alert severity="error" sx={{ mb: 2 }}>{message.text}</Alert>
        )}

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
            onChange={(e) => setPrompt(e.target.value)}
            required
          />

          <Button type="submit" variant="contained" endIcon={<SendIcon />}>Submit</Button>
        </Box>

        {aiResponse && (
          <Paper elevation={4} sx={{ mt: 4, p: 3, backgroundColor: '#f5f5f5' }}>
            <Typography variant="h5" color="primary" mb={2}>
              AI Response:
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', fontSize: '1.2rem' }}>
              {aiResponse}
            </Typography>
          </Paper>
        )}
      </Paper>
    </Container>
  );
}
