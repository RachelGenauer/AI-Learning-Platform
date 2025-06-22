import {
  Box,
  Typography,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import { useManageCategories } from './useManageCategories';

export function CategoriesLayout() {
  const {
    categories,
    newCategory,
    setNewCategory,
    newSubcategory,
    setNewSubcategory,
    subcategories,
    message,
    handleAddCategory,
    handleAddSubcategory,
    handleDeleteCategory,
    handleDeleteSubcategory,
  } = useManageCategories();

  return (
    <>
      {message && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}

      <Typography variant="h6" align="center">
        Add New Category
      </Typography>

      <Box display="flex" justifyContent="center" alignItems="center" gap={2} my={2}>
        <TextField
          label="Category name"
          variant="outlined"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddCategory}>
          Add Category
        </Button>
      </Box>

      {categories.map((cat) => (
        <Paper key={cat.id} sx={{ p: 3, mb: 3, borderRadius: 4 }}>
          <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={2}>
            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              {cat.name}
            </Typography>
            <IconButton onClick={() => handleDeleteCategory(cat.id)}>
              <DeleteIcon sx={{ color: 'primary.main' }} />
            </IconButton>
          </Box>

          <List>
            {subcategories[cat.id]?.map((sub) => (
              <ListItem key={sub.id} sx={{ pl: 4 }}>
                <ListItemText primary={sub.name} />
                <IconButton onClick={() => handleDeleteSubcategory(sub.id)}>
                  <DeleteIcon sx={{ color: 'primary.main' }} />
                </IconButton>
              </ListItem>
            ))}
          </List>

          <Box display="flex" gap={2} mt={2}>
            <TextField
              placeholder="New subcategory"
              value={newSubcategory[cat.id] || ''}
              onChange={(e) =>
                setNewSubcategory((prev) => ({ ...prev, [cat.id]: e.target.value }))
              }
            />
            <Button onClick={() => handleAddSubcategory(cat.id, cat.name)}>
              Add Subcategory
            </Button>
          </Box>
        </Paper>
      ))}
    </>
  );
}