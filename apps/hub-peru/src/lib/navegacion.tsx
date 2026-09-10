import {
  IconAssignmentOutlined,
  IconFactCheckOutlined,
  IconFolderOutlined,
  IconGroupOutlined,
  type GebNavItem
} from "@geb/ui";

/**
 * Navegación del sidebar de HUB Perú.
 *
 * Novedades y Auditoría quedan habilitadas siempre, tengamos o no consumo de
 * datos reales — no se filtran por `roles` (ese filtro de `GebAppLayout`
 * depende de los claims MVP de Entra ID vía `@geb/auth`, que hoy la cuenta no
 * trae porque no hay backend real que los emita; el gate por rol dentro de
 * cada página lo resuelve `resolverRolNovedades` con un fallback de esta app,
 * ver `lib/rolUiFallback.ts`).
 *
 * Solicitudes y Colaboradores no tienen dominio/backend todavía — se muestran
 * deshabilitadas (`nav-item disabled` del prototipo: sin click, texto
 * atenuado), no como placeholders navegables.
 *
 * `pendientesNovedades` alimenta el badge de "Novedades" (`GebNavItem.badge`,
 * soportado por `GebAppLayout` desde la auditoría de compliance del design
 * system) — se pasa desde afuera para no acoplar este módulo al store mock.
 */
export function construirNavegacion(pendientesNovedades: number): readonly GebNavItem[] {
  return [
    {
      etiqueta: "Novedades",
      ruta: "/novedades",
      badge: pendientesNovedades,
      icono: <IconFolderOutlined />
    },
    {
      etiqueta: "Solicitudes",
      ruta: "/solicitudes",
      icono: <IconAssignmentOutlined />,
      deshabilitado: true
    },
    {
      etiqueta: "Colaboradores",
      ruta: "/colaboradores",
      icono: <IconGroupOutlined />,
      deshabilitado: true
    },
    {
      etiqueta: "Auditoría",
      ruta: "/auditoria",
      icono: <IconFactCheckOutlined />
    }
  ];
}
