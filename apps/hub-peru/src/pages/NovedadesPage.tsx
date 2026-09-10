import { useEffect, useMemo, useState, type ReactNode } from "react";

import { useRolUi } from "@geb/auth";
import {
  GebBuzonNovedades,
  GebPageTitle,
  GebRegistrarNovedades,
  GebTabsWithBadge,
  listarNovedadesMock,
  suscribirNovedadesMock
} from "@geb/ui";

import { FILIALES_MOCK, TRABAJADORES_MOCK } from "../lib/datosOrganizacionMock";
import { resolverRolNovedades } from "../lib/rolUiFallback";

type TabNovedades = "registrar" | "buzon";

/**
 * Página Novedades: alterna Registrar Novedad / Buzón de Novedades (prototipo
 * HUB Perú), sobre los componentes ya construidos en `@geb/ui`.
 */
export function NovedadesPage(): ReactNode {
  const { rolActivo } = useRolUi();
  const rol = resolverRolNovedades(rolActivo);
  const [tab, setTab] = useState<TabNovedades>("registrar");
  const [tick, setTick] = useState(0);

  useEffect(() => suscribirNovedadesMock(() => setTick((t) => t + 1)), []);

  const pendientes = useMemo(() => {
    void tick;
    return listarNovedadesMock().filter((n) => n.estado === "Registrada").length;
  }, [tick]);

  return (
    <>
      <GebPageTitle>Buzón de Novedades</GebPageTitle>
      <GebTabsWithBadge
        value={tab}
        onChange={(id) => setTab(id as TabNovedades)}
        tabs={[
          { id: "registrar", etiqueta: "Registrar Novedad" },
          {
            id: "buzon",
            etiqueta: "Buzón de Novedades",
            conteo: pendientes,
            color: "primary"
          }
        ]}
      >
        {tab === "registrar" ? (
          <GebRegistrarNovedades
            rolActivo={rol}
            mostrarTitulo={false}
            trabajadores={TRABAJADORES_MOCK}
            filiales={FILIALES_MOCK}
          />
        ) : (
          <GebBuzonNovedades rolActivo={rol} />
        )}
      </GebTabsWithBadge>
    </>
  );
}
