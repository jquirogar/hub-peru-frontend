import type { ReactNode } from "react";

import { useRolUi } from "@geb/auth";
import { GebAuditoriaNovedades, GebEmptyState } from "@geb/ui";

export function AuditoriaPage(): ReactNode {
  const { rolActivo } = useRolUi();

  if (!rolActivo) {
    return (
      <GebEmptyState
        titulo="Sin acceso a Auditoría"
        descripcion="Se requiere rol RRHH Filial o Funcionario CSC."
      />
    );
  }

  return <GebAuditoriaNovedades rolActivo={rolActivo} />;
}
