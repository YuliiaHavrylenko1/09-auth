import axios from "axios";
import type { Note } from "@/types/note";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

interface FetchNotesResp {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResp> => {
  const params: FetchNotesParams = { page, perPage };
  if (search?.trim()) params.search = search;
  if (tag) params.tag = tag;

  const { data } = await axiosInstance.get<FetchNotesResp>("/notes", { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axiosInstance.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (
  noteData: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const { data } = await axiosInstance.post<Note>("/notes", noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axiosInstance.delete<Note>(`/notes/${id}`);
  return data;
};
