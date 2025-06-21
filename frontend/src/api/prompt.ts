import api from './axios';
import { Prompt } from '../types';

export const getPromptHistoryByUser = async (userId: string) => {
  const response = await api.get(`/prompts/${userId}`);
  return response.data;
};


export const getAllCategories = async (): Promise<string[]> => {
  const response = await api.get('/categories');
  return response.data.map((c: any) => c.name);
};

export const getSubCategoriesByCategory = async (categoryName: string): Promise<string[]> => {
  const response = await api.get(`/sub-categories/${categoryName}`);
  return response.data.map((sc: any) => sc.name);
};

export const getAllPrompts = async (): Promise<Prompt[]> => {
  const response = await api.get('/prompts/all');
  return response.data;
};

export const submitPrompt = async (data: {
  user_id: string;
  prompt: string;
  category_name: string;
  sub_category_name: string;
}) => {
  const response = await api.post('/prompts', data);
  return response.data;
};
