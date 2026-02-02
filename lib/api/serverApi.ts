// fetchNotes
// fetchNoteById
// getMe
// checkSession.

// Cookies
import { cookies } from 'next/headers';

// API
import { nextServer } from './api';

// Types
import type { User } from '@/types/user';

export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
