import { useState, type ReactNode } from "react";

import { useConectividad } from "@geb/offline";

import { syncQueue } from "../lib/syncQueue";

function formatearHora(fecha: Date): string {
  return fecha.toLocaleString("es-PE", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

/**
 * Widget de sincronización montado en `piePanelLateral` de `GebAppLayout`
 * (debajo de la navegación). El pill "En línea"/"Sin conexión" del Topbar
 * ya lo cubre `GebAppLayout` vía `online={estado !== "offline"}`.
 */
export function OfflineSyncWidget(): ReactNode {
  const { estado, pendientes } = useConectividad(syncQueue);
  const [ultimaSincronizacion, setUltimaSincronizacion] = useState<Date | null>(null);

  const sincronizar = async (): Promise<void> => {
    await syncQueue.drenar();
    setUltimaSincronizacion(new Date());
  };

  return (
    <div data-geb-app="OfflineSyncWidget">
      <button
        type="button"
        onClick={() => void sincronizar()}
        disabled={estado === "sincronizando"}
        style={{
          width: "100%",
          padding: "8px 12px",
          borderRadius: 8,
          border: "none",
          background: "#f2a900",
          color: "#0b1a33",
          fontWeight: 600,
          cursor: estado === "sincronizando" ? "default" : "pointer"
        }}
      >
        {estado === "sincronizando" ? "Sincronizando…" : "Sincronizar ahora"}
        {pendientes > 0 ? ` (${pendientes})` : ""}
      </button>
      <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 8, marginBottom: 0 }}>
        Última sincronización:
        <br />
        {ultimaSincronizacion ? formatearHora(ultimaSincronizacion) : "—"}
      </p>
    </div>
  );
}
