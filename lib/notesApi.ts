import axios from "axios";
import type { Note } from "@/types/note";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchNotes = async (): Promise<Note[]> => {
  const res = await axiosInstance.get<Note[]>("/notes");
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axiosInstance.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (noteData: Omit<Note, "id" | "createdAt" | "updatedAt">): Promise<Note> => {
  const res = await axiosInstance.post<Note>("/notes", noteData);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axiosInstance.delete<Note>(`/notes/${id}`);
  return res.data;
};
