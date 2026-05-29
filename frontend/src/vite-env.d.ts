/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** e.g. http://localhost:3001 — no trailing slash */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
