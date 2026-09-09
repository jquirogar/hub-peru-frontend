/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENTRA_CLIENT_ID: string;
  readonly VITE_ENTRA_TENANT_ID: string;
  readonly VITE_ENTRA_REDIRECT_URI: string;
  readonly VITE_API_SCOPE: string;
  readonly VITE_API_BASE_URL: string;
  /** Solo desarrollo — ver `src/lib/devMockAuth.tsx`. Nunca activar en producción. */
  readonly VITE_DEV_MOCK_AUTH?: string;
  readonly [key: string]: string | undefined;
}
