import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FolderIcon from '@mui/icons-material/Folder';
import {
  getAllCategories,
  addCategory,
  deleteCategory,
  getSubcategoriesByCategory,
  addSubcategory,
  deleteSubcategory,
} from '../api/categories';

export default function ManageCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState<Record<number, string>>({});
  const [subcategories, setSubcategories] = useState<Record<number, { id: number; name: string }[]>>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
      const allSubs: Record<number, { id: number; name: string }[]> = {};
      for (const cat of data) {
        const subs = await getSubcategoriesByCategory(cat.name);
        allSubs[cat.id] = subs; // צריך להחזיר [{id, name}]
      }
      setSubcategories(allSubs);
    } catch {
      setMessage({ type: 'error', text: 'Failed to load categories' });
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      await addCategory(newCategory);
      setNewCategory('');
      setMessage({ type: 'success', text: 'Category added' });
      loadCategories();
    } catch {
      setMessage({ type: 'error', text: 'Failed to add category' });
    }
  };

  const handleAddSubcategory = async (categoryId: number, categoryName: string) => {
    try {
      const name = newSubcategory[categoryId];
      if (!name) return;
      await addSubcategory(categoryName, name);
      setNewSubcategory((prev) => ({ ...prev, [categoryId]: '' }));
      setMessage({ type: 'success', text: 'Subcategory added' });
      loadCategories();
    } catch {
      setMessage({ type: 'error', text: 'Failed to add subcategory' });
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      await deleteCategory(categoryId);
      setMessage({ type: 'success', text: 'Category deleted' });
      loadCategories();
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete category' });
    }
  };

  const handleDeleteSubcategory = async (subId: number) => {
    try {
      await deleteSubcategory(subId);
      setMessage({ type: 'success', text: 'Subcategory deleted' });
      loadCategories();
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete subcategory' });
    }
  };

  return (
    <Container maxWidth="md" sx={{ fontFamily: 'Amatic SC', mt: 5 }}>
      <Button variant="contained" startIcon={<ArrowBackIcon />} href="/admin" sx={{ mb: 3 }}>
        Return to the admin dashboard
      </Button>

      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
        <FolderIcon sx={{ fontSize: 36, mr: 1, verticalAlign: 'middle' }} />
        Categories and Subcategories
      </Typography>

      {message && (
        <Box mb={2}>
          <Alert severity={message.type}>{message.text}</Alert>
        </Box>
      )}

      <Typography variant="h6" align="center">Add New Category</Typography>

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
            <Typography variant="h4" sx={{ color: 'primary.main', fontSize: '2.2rem', fontWeight: 'bold' }}>
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
    </Container>
  );
}
