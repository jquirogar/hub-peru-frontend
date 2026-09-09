import { SyncQueue } from "@geb/offline";

/**
 * Instancia única de `SyncQueue` para todo el ciclo de vida de la app
 * (patrón `@geb/offline`: nunca instanciar dentro del cuerpo de un componente).
 *
 * `hub-peru/backend` no existe todavía: `enviar` es un placeholder de demo
 * que nunca se cablea a un formulario real en este milestone (nada llama
 * `syncQueue.encolar()` aún), así que en la práctica `drenar()` solo se
 * ejecuta sobre una cola vacía. Cuando haya backend, reemplazar por
 * `apiClient.request(...)` como documenta el README de `@geb/offline`.
 */
export const syncQueue = new SyncQueue({
  enviar: async () => {
    throw new Error("hub-peru/backend no existe todavía — nada que sincronizar.");
  }
});
