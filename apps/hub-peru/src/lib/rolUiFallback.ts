import type { RolMvpNovedades } from "@geb/auth";

/**
 * Novedades y Auditoría deben poder usarse (con datos mock) aunque la cuenta
 * de Entra ID todavía no tenga el claim de rol RRHH_FILIAL/FUNCIONARIO_CSC
 * configurado en el app registration — no hay backend real todavía que emita
 * ese claim. `@geb/auth` no inventa roles (política del catálogo compartido:
 * `rolesCatalogo.ts`), así que este fallback vive acá, a nivel de esta app,
 * y no toca esa lógica.
 */
export const ROL_NOVEDADES_FALLBACK: RolMvpNovedades = "RRHH_FILIAL";

/** `rolActivo` real si hay claims MVP; si no, el fallback de esta app. */
export function resolverRolNovedades(rolActivo: RolMvpNovedades | null): RolMvpNovedades {
  return rolActivo ?? ROL_NOVEDADES_FALLBACK;
}
