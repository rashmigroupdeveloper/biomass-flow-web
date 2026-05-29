import { API_BASE_URL } from '@/config/env';

export type JobApplicationPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department?: string;
  experience?: string;
  education?: string;
  coverLetter?: string;
  source?: string;
  vacancyId?: number;
  resume: File;
};

export type ApplicationSuccess = {
  message: string;
  applicationId: string;
  note?: string;
};

export type ApplicationError = {
  message: string;
  error?: string;
};

export type ApplicationSubmitResult =
  | { ok: true; data: ApplicationSuccess }
  | { ok: false; message: string };

export async function submitJobApplication(
  payload: JobApplicationPayload,
): Promise<ApplicationSubmitResult> {
  const form = new FormData();
  form.append('firstName', payload.firstName);
  form.append('lastName', payload.lastName);
  form.append('email', payload.email);
  form.append('phone', payload.phone);
  form.append('position', payload.position);
  if (payload.department) form.append('department', payload.department);
  if (payload.experience) form.append('experience', payload.experience);
  if (payload.education) form.append('education', payload.education);
  if (payload.coverLetter) form.append('coverLetter', payload.coverLetter);
  form.append('source', payload.source ?? 'Rashmi 6 Paradigm Career Page');
  if (payload.vacancyId != null) form.append('vacancyId', String(payload.vacancyId));
  form.append('resume', payload.resume);

  const res = await fetch(`${API_BASE_URL}/api/applications`, {
    method: 'POST',
    body: form,
  });

  let data: ApplicationSuccess | ApplicationError;
  try {
    data = (await res.json()) as ApplicationSuccess | ApplicationError;
  } catch {
    return { ok: false as const, message: `Invalid response from server (HTTP ${res.status}).` };
  }

  if (!res.ok) {
    const err = data as ApplicationError;
    return {
      ok: false as const,
      message: err.error ?? err.message ?? `Request failed (HTTP ${res.status}).`,
    };
  }

  return { ok: true as const, data: data as ApplicationSuccess };
}
