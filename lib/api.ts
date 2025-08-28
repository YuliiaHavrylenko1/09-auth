import axios from "axios";
import type { Note } from "../types/note";

const API_BASE_URL = "https://notehub-public.goit.study/api";
const NOTES_ENDPOINT = "/notes";


const myKey = process.env.NEXT_PUBLIC_API_TOKEN;

if (!myKey) {
  throw new Error("NOTEHUB_TOKEN is not defined in environment variables");
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${myKey}`,
  },
});

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string; 
}

interface FetchNotesResp {
  page: number;
  notes: Note[];
  totalPages: number;
  perPage: number;
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

  console.log("Fetching notes with params:", params);

  const res = await axiosInstance.get<FetchNotesResp>(NOTES_ENDPOINT, { params });
  return res.data;
};

export const createNote = async (
  noteData: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const res = await axiosInstance.post<Note>(NOTES_ENDPOINT, noteData);
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await axiosInstance.delete<Note>(`${NOTES_ENDPOINT}/${noteId}`);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axiosInstance.get<Note>(`${NOTES_ENDPOINT}/${id}`);
  return res.data;
};
