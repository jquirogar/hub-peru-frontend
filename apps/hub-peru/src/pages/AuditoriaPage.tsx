import type { ReactNode } from "react";

import { useRolUi } from "@geb/auth";
import { GebAuditoriaNovedades } from "@geb/ui";

import { resolverRolNovedades } from "../lib/rolUiFallback";

export function AuditoriaPage(): ReactNode {
  const { rolActivo } = useRolUi();

  return <GebAuditoriaNovedades rolActivo={resolverRolNovedades(rolActivo)} />;
}
