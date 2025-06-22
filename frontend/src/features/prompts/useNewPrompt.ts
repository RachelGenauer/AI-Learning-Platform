import { useEffect, useState } from 'react';
import { getAllCategories, getSubCategoriesByCategory, submitPrompt } from '../../api/prompt';

export function useNewPrompt() {
  const [prompt, setPrompt] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [message, setMessage] = useState<{ type: 'error'; text: string } | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

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

      setAiResponse(data.response);
      setMessage(null);
      setPrompt('');
      setCategoryName('');
      setSubCategoryName('');
    } catch (error: any) {
      setAiResponse(null);
      setMessage({ type: 'error', text: error.message || 'Failed to submit prompt' });
    }
  };

  return {
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
    handleSubmit,
  };
}
