import {
  listarNovedadesMock,
  seedNovedadesMock,
  type HistorialEntradaMock,
  type NovedadMock
} from "@geb/ui";

/**
 * Siembra datos de ejemplo (mismo estilo del prototipo interactivo de HUB
 * Perú) para que Buzón/Auditoría no se vean vacíos en el primer arranque —
 * sin backend real, el store mock empieza vacío. No-op si ya hay datos
 * (evita duplicar en hot-reload).
 */
export function sembrarDemoSiVacio(): void {
  if (listarNovedadesMock().length > 0) return;

  const novedades: NovedadMock[] = [
    {
      id: "nov-1",
      radicado: "NOV-A-000001",
      trabajadorId: "t-juan-perez",
      trabajadorNombre: "Juan Pérez",
      novedadCodigo: "asistencia",
      novedadEtiqueta: "Asistencia / Ausentismo",
      origen: "masiva_archivo",
      estado: "Registrada",
      creadoEn: "2026-08-09T09:00:00.000Z",
      archivoNombre: "asistencia_juan_perez_ago.xlsx",
      sustentos: [{ nombre: "Certificado_corte_luz.pdf" }],
      fechaNovedad: "2026-08-09"
    },
    {
      id: "nov-2",
      radicado: "NOV-B-000006",
      trabajadorId: "t-ana-torres",
      trabajadorNombre: "Ana Torres",
      novedadCodigo: "descuento-eps",
      novedadEtiqueta: "Descuento de EPS",
      origen: "individual",
      estado: "Registrada",
      porAnular: true,
      anulacionSolicitadaPorRol: "RRHH_FILIAL",
      creadoEn: "2026-08-08T09:00:00.000Z",
      fechaNovedad: "2026-08-08"
    },
    {
      id: "nov-3",
      radicado: "NOV-A-000010",
      trabajadorId: "t-juan-perez",
      trabajadorNombre: "Juan Pérez",
      novedadCodigo: "horas-extra",
      novedadEtiqueta: "Horas extra",
      origen: "masiva_archivo",
      estado: "Registrada",
      creadoEn: "2026-08-04T09:00:00.000Z",
      archivoNombre: "horas_extra_juan_perez_ago.xlsx",
      fechaNovedad: "2026-08-04"
    },
    {
      id: "nov-4",
      radicado: "NOV-A-000004",
      trabajadorId: "t-ana-torres",
      trabajadorNombre: "Ana Torres",
      novedadCodigo: "cambio-turno",
      novedadEtiqueta: "Cambio de Turno",
      origen: "masiva_archivo",
      estado: "Registrada",
      conActualizacion: true,
      creadoEn: "2026-08-01T09:00:00.000Z",
      archivoNombre: "cambio_turno_ana_torres_ago.xlsx",
      fechaNovedad: "2026-08-01"
    },
    {
      id: "nov-5",
      radicado: "NOV-A-000007",
      trabajadorId: "t-luis-ramirez",
      trabajadorNombre: "Pedro Salas",
      novedadCodigo: "requerimiento-personal",
      novedadEtiqueta: "Requerimiento de Personal",
      origen: "masiva_archivo",
      estado: "Registrada",
      creadoEn: "2026-08-01T09:00:00.000Z",
      archivoNombre: "requerimiento_personal_pedro_salas.xlsx",
      fechaNovedad: "2026-08-01"
    },
    {
      id: "nov-6",
      radicado: "NOV-A-000002",
      trabajadorId: "t-juan-perez",
      trabajadorNombre: "Juan Pérez",
      novedadCodigo: "cambio-turno",
      novedadEtiqueta: "Cambio de Turno",
      origen: "masiva_archivo",
      estado: "Procesada",
      porAnular: true,
      anulacionSolicitadaPorRol: "RRHH_FILIAL",
      creadoEn: "2026-07-18T09:00:00.000Z",
      procesadoEn: "2026-07-19T09:00:00.000Z",
      archivoNombre: "cambio_turno_juan_perez_julio.xlsx",
      mesSugerido: "2026-07",
      fechaNovedad: "2026-07-18"
    },
    {
      id: "nov-7",
      radicado: "NOV-A-000013",
      trabajadorId: "t-juan-perez",
      trabajadorNombre: "Juan Pérez",
      novedadCodigo: "horas-extra",
      novedadEtiqueta: "Horas extra",
      origen: "masiva_archivo",
      estado: "Procesada",
      creadoEn: "2026-06-12T09:00:00.000Z",
      procesadoEn: "2026-06-14T09:00:00.000Z",
      archivoNombre: "horas_extra_junio_rrhh_calidda.xlsx",
      sustentos: [
        { nombre: "Orden_inspeccion.pdf" },
        { nombre: "Registro_asistencia.zip" }
      ],
      mesSugerido: "2026-06",
      fechaNovedad: "2026-06-12"
    },
    {
      id: "nov-8",
      radicado: "NOV-B-000003",
      trabajadorId: "t-juan-perez",
      trabajadorNombre: "Juan Pérez",
      novedadCodigo: "descanso-medico",
      novedadEtiqueta: "Descanso médico",
      origen: "individual",
      estado: "Anulada",
      creadoEn: "2026-07-04T09:00:00.000Z",
      fechaNovedad: "2026-07-04"
    }
  ];

  const historial: HistorialEntradaMock[] = novedades.flatMap((n): HistorialEntradaMock[] => {
    const entradas: HistorialEntradaMock[] = [
      {
        id: `hist-${n.id}-1`,
        novedadId: n.id,
        radicado: n.radicado,
        fecha: n.creadoEn,
        trabajadorNombre: n.trabajadorNombre,
        rolEjecutor: "RRHH_FILIAL",
        accion: "Registrada",
        estadoAnterior: "—",
        estadoNuevo: "Registrada"
      }
    ];
    if (n.procesadoEn) {
      entradas.push({
        id: `hist-${n.id}-2`,
        novedadId: n.id,
        radicado: n.radicado,
        fecha: n.procesadoEn,
        trabajadorNombre: n.trabajadorNombre,
        rolEjecutor: "FUNCIONARIO_CSC",
        accion: "Procesada",
        estadoAnterior: "Registrada",
        estadoNuevo: "Procesada"
      });
    }
    if (n.estado === "Anulada") {
      entradas.push({
        id: `hist-${n.id}-3`,
        novedadId: n.id,
        radicado: n.radicado,
        fecha: n.creadoEn,
        trabajadorNombre: n.trabajadorNombre,
        rolEjecutor: "RRHH_FILIAL",
        accion: "Anulada",
        estadoAnterior: "Registrada",
        estadoNuevo: "Anulada"
      });
    }
    return entradas;
  });

  seedNovedadesMock(novedades, historial);
}
