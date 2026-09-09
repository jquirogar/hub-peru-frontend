import { ROLES_MVP_NOVEDADES } from "@geb/auth";
import {
  IconAssignmentOutlined,
  IconFactCheckOutlined,
  IconFolderOutlined,
  IconGroupOutlined,
  type GebNavItem
} from "@geb/ui";

/**
 * Navegación del sidebar de HUB Perú. Solicitudes y Colaboradores no tienen
 * dominio/backend todavía (llevan a `PlaceholderPage`) — se mantienen en el
 * menú para igualar el prototipo, sin construir su CRUD completo.
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
      roles: ROLES_MVP_NOVEDADES,
      badge: pendientesNovedades,
      icono: <IconFolderOutlined />
    },
    { etiqueta: "Solicitudes", ruta: "/solicitudes", icono: <IconAssignmentOutlined /> },
    { etiqueta: "Colaboradores", ruta: "/colaboradores", icono: <IconGroupOutlined /> },
    {
      etiqueta: "Auditoría",
      ruta: "/auditoria",
      roles: ROLES_MVP_NOVEDADES,
      icono: <IconFactCheckOutlined />
    }
  ];
}
