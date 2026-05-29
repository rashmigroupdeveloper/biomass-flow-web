import { API_BASE_URL } from '@/config/env';

export type JobListing = {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  responsibilities: string[];
  is_active: boolean;
  posted_date: string;
  closing_date?: string;
  salary_range?: string;
  featured: boolean;
};

export type JobsUnavailableError = {
  error: string;
  message: string;
};

export type JobListingsResult =
  | { ok: true; jobs: JobListing[] }
  | { ok: false; message: string };

export type JobDetailResult =
  | { ok: true; job: JobListing }
  | { ok: false; message: string };

export async function fetchJobListings(): Promise<JobListingsResult> {
  const res = await fetch(`${API_BASE_URL}/api/careers`);

  if (res.status === 503) {
    const body = (await res.json().catch(() => ({}))) as JobsUnavailableError;
    return {
      ok: false as const,
      message: body.message ?? 'Unable to load job listings. Please try again later.',
    };
  }

  if (!res.ok) {
    return { ok: false as const, message: `Could not load jobs (HTTP ${res.status}).` };
  }

  const jobs = (await res.json()) as JobListing[];
  return { ok: true as const, jobs: Array.isArray(jobs) ? jobs : [] };
}

export async function fetchJobById(
  id: number,
): Promise<JobDetailResult> {
  const res = await fetch(`${API_BASE_URL}/api/careers/${id}`);

  if (res.status === 404) {
    return { ok: false as const, message: 'This position is no longer available.' };
  }

  if (!res.ok) {
    return { ok: false as const, message: `Could not load job details (HTTP ${res.status}).` };
  }

  const job = (await res.json()) as JobListing;
  return { ok: true as const, job };
}
