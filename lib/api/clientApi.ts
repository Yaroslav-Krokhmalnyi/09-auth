// fetchNotes;
// fetchNoteById;
// createNote;
// deleteNote;
// register;
// login;
// logout;
// checkSession;
// getMe;
// updateMe;

// API
import { nextServer } from '@/lib/api/api';
// Types
import type { User } from '@/types/user';

export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};
