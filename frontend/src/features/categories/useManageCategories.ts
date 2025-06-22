import { useEffect, useState } from 'react';
import {
  getAllCategories,
  addCategory,
  deleteCategory,
  getSubcategoriesByCategory,
  addSubcategory,
  deleteSubcategory,
} from '../../api/categories';

export function useManageCategories() {
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
        allSubs[cat.id] = subs;
      }
      setSubcategories(allSubs);
    } catch {
      setMessage({ type: 'error', text: 'Failed to load categories' });
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    newCategory,
    setNewCategory,
    newSubcategory,
    setNewSubcategory,
    subcategories,
    message,
    setMessage,
    loadCategories,
    handleAddCategory: async () => {
      try {
        await addCategory(newCategory);
        setNewCategory('');
        setMessage({ type: 'success', text: 'Category added' });
        loadCategories();
      } catch {
        setMessage({ type: 'error', text: 'Failed to add category' });
      }
    },
    handleAddSubcategory: async (categoryId: number, categoryName: string) => {
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
    },
    handleDeleteCategory: async (categoryId: number) => {
      try {
        await deleteCategory(categoryId);
        setMessage({ type: 'success', text: 'Category deleted' });
        loadCategories();
      } catch {
        setMessage({ type: 'error', text: 'Failed to delete category' });
      }
    },
    handleDeleteSubcategory: async (subId: number) => {
      try {
        await deleteSubcategory(subId);
        setMessage({ type: 'success', text: 'Subcategory deleted' });
        loadCategories();
      } catch {
        setMessage({ type: 'error', text: 'Failed to delete subcategory' });
      }
    },
  };
}
