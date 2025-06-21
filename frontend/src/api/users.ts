import api from './axios';
import { User } from '../types';

export const registerUser = async (user: User) => {
  const response = await api.post('/users', user);
  return response.data;
};

export const loginUser = async (name: string, phone: string) => {
  const response = await api.post('/users/login', { name, phone });
  return response.data;
};