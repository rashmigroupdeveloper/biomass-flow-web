/** Backend origin (no trailing slash). Dev default matches backend PORT=3001. */
export const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:3001').replace(/\/$/, '');
