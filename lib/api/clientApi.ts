'use client';

import api from './api';
import { User } from '@/types/user';
import { AxiosError } from 'axios';

export const registerUser = async (email: string, password: string): Promise<User> => {
  try {
    const { data } = await api.post('/auth/register', { email, password });
    return data;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 409) {
      throw new Error('User already exists');
    }
    throw err;
  }
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      
      if (err.response?.status === 409) {
        throw new Error('Conflict: user already exists or invalid login state');
      }
      throw new Error(err.response?.data?.message || 'Login failed');
    }
    throw err;
  }
};

export const logoutUser = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const getCurrentUser = async (): Promise<User> => {
  const { data } = await api.get('/users/me');
  return data;
};
