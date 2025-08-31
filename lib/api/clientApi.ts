// import axios from "axios";
// import type { Note } from "@/types/note";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// export const fetchNotes = async (): Promise<Note[]> => {
//   const res = await axiosInstance.get<Note[]>("/notes");
//   return res.data;
// };

// export const fetchNoteById = async (id: string): Promise<Note> => {
//   const res = await axiosInstance.get<Note>(`/notes/${id}`);
//   return res.data;
// };

// export const createNote = async (
//   noteData: Omit<Note, "id" | "createdAt" | "updatedAt">
// ): Promise<Note> => {
//   const res = await axiosInstance.post<Note>("/notes", noteData);
//   return res.data;
// };

// export const deleteNote = async (id: string): Promise<Note> => {
//   const res = await axiosInstance.delete<Note>(`/notes/${id}`);
//   return res.data;
// };
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
