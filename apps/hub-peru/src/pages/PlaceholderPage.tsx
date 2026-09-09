import type { ReactNode } from "react";

import { GebEmptyState } from "@geb/ui";

export interface PlaceholderPageProps {
  titulo: string;
}

/** Reusada por Solicitudes/Colaboradores: sin dominio/backend todavía. */
export function PlaceholderPage({ titulo }: PlaceholderPageProps): ReactNode {
  return (
    <GebEmptyState
      titulo="Próximamente"
      descripcion={`${titulo} todavía no está disponible en este milestone.`}
    />
  );
}
