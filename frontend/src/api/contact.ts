import { API_BASE_URL } from '@/config/env';

export type ContactApiPayload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  selectedProducts?: string[];
  recaptchaToken?: string;
};

export type ContactApiSuccess = {
  success: true;
  message: string;
  referenceId: string;
  emailSent?: boolean;
};

export type ContactApiError = {
  success: false;
  message: string;
  errors?: string[];
  error?: string;
};

export async function submitContactForm(payload: ContactApiPayload): Promise<ContactApiSuccess | ContactApiError> {
  const res = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  let data: ContactApiSuccess | ContactApiError;
  try {
    data = (await res.json()) as ContactApiSuccess | ContactApiError;
  } catch {
    return {
      success: false,
      message: `Invalid response from server (HTTP ${res.status}).`,
    };
  }

  if (!res.ok && data.success !== false) {
    return {
      success: false,
      message: `Request failed (HTTP ${res.status}).`,
    };
  }

  return data;
}
