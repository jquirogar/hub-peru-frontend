import type { FilialOpcion, TrabajadorOpcion } from "@geb/ui";

/**
 * Roster mock de trabajadores/filiales para alimentar `GebRegistrarNovedades`
 * mientras no hay backend real (`hub-peru/backend`). Nombres consistentes con
 * el prototipo interactivo de HUB Perú.
 */
export const FILIALES_MOCK: readonly FilialOpcion[] = [
  { id: "f-calidda", nombre: "Cálidda" },
  { id: "f-norte", nombre: "Filial Norte" },
  { id: "f-sur", nombre: "Filial Sur" }
];

export const TRABAJADORES_MOCK: readonly TrabajadorOpcion[] = [
  { id: "t-juan-perez", nombre: "Juan Pérez", filial: "f-calidda" },
  { id: "t-ana-torres", nombre: "Ana Torres", filial: "f-calidda" },
  { id: "t-luis-ramirez", nombre: "Luis Ramírez", filial: "f-norte" },
  { id: "t-carla-ruiz", nombre: "Carla Ruiz", filial: "f-sur" }
];
