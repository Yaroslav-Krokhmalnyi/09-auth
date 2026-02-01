import axios from 'axios';
import type { Note, NoteTag, CreateNoteParams } from '@/types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
  sortBy?: 'created' | 'updated';
}

export const nextServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
});

// Fetch notes list — SSR + CSR
export async function fetchNotes({
  page,
  perPage,
  search,
  tag,
  sortBy = 'created',
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const params = {
    page,
    perPage,
    ...(search && search.trim() ? { search: search.trim() } : {}),
    ...(tag ? { tag } : {}),
    ...(sortBy ? { sortBy } : {}),
  };

  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params,
  });

  return response.data;
}

// Create note — CSR mutation
export async function addNote(payload: CreateNoteParams): Promise<Note> {
  const response = await nextServer.post<Note>('/notes', payload, {});

  return response.data;
}

// Delete note — MUST return deleted Note (mentor requirement)
export async function deleteNote(id: string): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${id}`, {});

  return response.data;
}

// Fetch note by ID — SSR + CSR
export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`, {});

  return response.data;
}

// Getcategories
export async function getCategories(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`, {});

  return response.data;
}
