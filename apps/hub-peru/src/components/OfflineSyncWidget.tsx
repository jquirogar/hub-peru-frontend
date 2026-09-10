import { useState, type ReactNode } from "react";

import { useConectividad } from "@geb/offline";
import { IconSync } from "@geb/ui";

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
 *
 * Medidas y colores exactos del prototipo (`.sync-btn` / `.sync-info`).
 */
export function OfflineSyncWidget(): ReactNode {
  const { estado, pendientes } = useConectividad(syncQueue);
  const [ultimaSincronizacion, setUltimaSincronizacion] = useState<Date | null>(null);

  const sincronizando = estado === "sincronizando";

  const sincronizar = async (): Promise<void> => {
    await syncQueue.drenar();
    setUltimaSincronizacion(new Date());
  };

  return (
    <div data-geb-app="OfflineSyncWidget">
      <button
        type="button"
        onClick={() => void sincronizar()}
        disabled={sincronizando}
        style={{
          width: "100%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          padding: "5px 12px",
          fontSize: "13px",
          fontWeight: 600,
          lineHeight: "20px",
          fontFamily: "inherit",
          borderRadius: "8px",
          border: "1px solid #f59e0b",
          background: "#f59e0b",
          color: "#92400e",
          cursor: sincronizando ? "default" : "pointer",
          opacity: sincronizando ? 0.7 : 1
        }}
      >
        <IconSync size={16} />
        {sincronizando ? "Sincronizando…" : "Sincronizar ahora"}
        {pendientes > 0 ? ` (${pendientes})` : ""}
      </button>
      <div
        style={{
          fontSize: "11px",
          lineHeight: 1.5,
          color: "rgba(255,255,255,0.55)",
          marginTop: "10px",
          textAlign: "center"
        }}
      >
        Última sincronización
        <span style={{ display: "block" }}>
          {ultimaSincronizacion ? formatearHora(ultimaSincronizacion) : "—"}
        </span>
      </div>
    </div>
  );
}
