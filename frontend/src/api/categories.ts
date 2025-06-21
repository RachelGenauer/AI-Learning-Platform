import api from './axios';

export const getAllCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const addCategory = async (categoryName: string) => {
  const response = await api.post('/categories', { name: categoryName });
  return response.data;
};

export const deleteCategory = async (categoryId: number) => {
  const response = await api.delete(`/categories/${categoryId}`);
  return response.data;
};

export const getSubcategoriesByCategory = async (categoryName: string) => {
  const response = await api.get(`/sub-categories/${categoryName}`);
  return response.data;
};

export const addSubcategory = async (categoryName: string, subcategoryName: string) => {
  const response = await api.post('/sub-categories', {
    category_name: categoryName,
    name: subcategoryName,
  });
  return response.data;
};

export const deleteSubcategory = async (subCategoryId: number) => {
  const response = await api.delete(`/sub-categories/${subCategoryId}`);
  return response.data;
};
