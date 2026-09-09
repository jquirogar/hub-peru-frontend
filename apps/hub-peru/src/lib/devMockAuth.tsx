import type { ReactNode } from "react";

import { GebAuthContext, type GebAuthContextValue, type UsuarioGeb } from "@geb/auth";

/**
 * Bypass de auth **solo para desarrollo local**, mientras no hay credenciales
 * reales de Entra ID. Se activa con `VITE_DEV_MOCK_AUTH=true` en `.env` — por
 * defecto está apagado (auth real). Nunca usar en producción: no valida nada,
 * simula una sesión ya autenticada con rol `RRHH_FILIAL`.
 *
 * No toca `@geb/auth`: provee `GebAuthContext` directamente (mismo contexto
 * que usa `useAuth()`/`RequireAuth`/`RolUiProvider` de la librería real), así
 * que el resto de la app funciona exactamente igual que con una sesión real.
 */
export const DEV_MOCK_AUTH_ACTIVO = import.meta.env.VITE_DEV_MOCK_AUTH === "true";

const USUARIO_MOCK: UsuarioGeb = {
  id: "dev-mock-user",
  nombre: "RRHH Cálidda",
  correo: "dev-mock@hub-peru.invalid",
  roles: ["RRHH_FILIAL"],
  tenant: "MODO DEV — sin Entra ID"
};

const VALOR_MOCK: GebAuthContextValue = {
  estado: "autenticado",
  usuario: USUARIO_MOCK,
  obtenerToken: async () => "dev-mock-token",
  // No hay flujo de login real que disparar en modo mock (ya "autenticado").
  login: () => Promise.resolve(),
  logout: async () => {
    // No hay sesión real que cerrar; recargar alcanza para "salir" del mock.
    window.location.reload();
  }
};

export function DevMockAuthProvider({ children }: { children: ReactNode }): ReactNode {
  return <GebAuthContext.Provider value={VALOR_MOCK}>{children}</GebAuthContext.Provider>;
}
