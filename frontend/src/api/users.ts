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

export const getAllUsers = async () => {
  const res = await api.get('/users');
  return res.data;
};

export const updateUser = async (userId: string, data: { name?: string; phone?: string }) => {
  const res = await api.put(`/users/${userId}`, data);
  return res.data;
};

export const deleteUser = async (userId: string) => {
  const res = await api.delete(`/users/${userId}`);
  return res.data;
};