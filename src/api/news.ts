import { API_BASE_URL } from '@/config/env';

export type NewsItem = {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  image: string | null;
  documentUrl: string | null;
  externalUrl: string | null;
};

export async function fetchNews(): Promise<
  { ok: true; items: NewsItem[] } | { ok: false; message: string }
> {
  const res = await fetch(`${API_BASE_URL}/api/news`);

  if (!res.ok) {
    return { ok: false, message: `Could not load news (HTTP ${res.status}).` };
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    return { ok: false, message: 'Invalid response from server.' };
  }

  if (!Array.isArray(data)) {
    return { ok: false, message: 'Unexpected news response format.' };
  }

  const items: NewsItem[] = data.map((raw: unknown) => {
    const r = raw as Record<string, unknown>;
    return {
      id: Number(r.id) || 0,
      title: String(r.title ?? 'Untitled'),
      date: String(r.date ?? ''),
      category: String(r.category ?? 'General'),
      excerpt: String(r.excerpt ?? ''),
      content: String(r.content ?? ''),
      image: r.image == null ? null : String(r.image),
      documentUrl: r.documentUrl == null ? null : String(r.documentUrl),
      externalUrl: r.externalUrl == null ? null : String(r.externalUrl),
    };
  });

  return { ok: true, items };
}
