import { useEffect, useMemo, useState, type ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

/**
 * Workaround: bajo esta combinación de @types/react 18.3.x + react-router-dom
 * 6.x, `Routes`/`Route` (tipadas para devolver `ReactElement | null`) fallan
 * el chequeo de asignabilidad a `ReactNode` (regresión conocida de @types/react
 * sobre `ReactPortal.children`). `BrowserRouter`/`Navigate` no se ven afectados.
 * Se acota el cast a estos dos componentes (con una forma de props propia, sin
 * derivar de `typeof Routes`/`typeof Route` para no arrastrar el mismo tipo
 * problemático), sin tocar la config de TS del repo.
 */
interface RoutesJsxProps {
  children?: ReactNode;
}
interface RouteJsxProps {
  path: string;
  element: ReactNode;
}
const RoutesJsx = Routes as unknown as (props: RoutesJsxProps) => ReactNode;
const RouteJsx = Route as unknown as (props: RouteJsxProps) => ReactNode;

import { GebAuthProvider, RequireAuth, RolUiProvider, configDesdeEnv, etiquetaRol, useAuth } from "@geb/auth";
import {
  GebAppLayout,
  GebErrorState,
  GebThemeProvider,
  GebToast,
  HubPeruBrandSplash,
  HubPeruLoginScreen,
  listarNovedadesMock,
  suscribirNovedadesMock
} from "@geb/ui";

import { OfflineSyncWidget } from "./components/OfflineSyncWidget";
import { DEV_MOCK_AUTH_ACTIVO, DevMockAuthProvider } from "./lib/devMockAuth";
import { construirNavegacion } from "./lib/navegacion";
import { sembrarDemoSiVacio } from "./lib/seedDemoMock";
import { AuditoriaPage } from "./pages/AuditoriaPage";
import { NovedadesPage } from "./pages/NovedadesPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";

// Datos de ejemplo para que Buzón/Auditoría no arranquen vacíos (sin backend
// real todavía); no-op si el store ya tiene datos (ver seedDemoMock.ts).
sembrarDemoSiVacio();

const LOGO_SRC = "/assets/geb-logo.png";

const splash = <HubPeruBrandSplash logoSrc={LOGO_SRC} />;

/** Banner imposible de pasar por alto mientras corre sin auth real. */
function BannerModoDev(): ReactNode {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2000,
        background: "#f2a900",
        color: "#0b1a33",
        textAlign: "center",
        fontWeight: 700,
        fontSize: 13,
        padding: "4px 8px"
      }}
    >
      MODO DEV — sesión simulada, sin Entra ID real (VITE_DEV_MOCK_AUTH=true). No usar en producción.
    </div>
  );
}

function AppShell(): ReactNode {
  const { usuario, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [tick, setTick] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => suscribirNovedadesMock(() => setTick((t) => t + 1)), []);

  const pendientesNovedades = useMemo(() => {
    void tick;
    return listarNovedadesMock().filter((n) => n.estado === "Registrada").length;
  }, [tick]);

  const navegacion = useMemo(
    () => construirNavegacion(pendientesNovedades),
    [pendientesNovedades]
  );

  return (
    <>
      <GebAppLayout
        tituloApp="HUB Perú"
        navegacion={navegacion}
        usuario={
          usuario
            ? {
                nombre: usuario.nombre,
                tenant: usuario.tenant,
                roles: usuario.roles,
                rolEtiqueta: usuario.roles[0] ? etiquetaRol(usuario.roles[0]) : undefined
              }
            : undefined
        }
        rutaActual={location.pathname}
        onNavegar={(ruta) => navigate(ruta)}
        onLogout={() => void logout()}
        onAyuda={() => setToast("La ayuda todavía no está disponible en este milestone.")}
        onNotificaciones={() => setToast("Las notificaciones todavía no están disponibles en este milestone.")}
        logoSrc={LOGO_SRC}
        online
        piePanelLateral={<OfflineSyncWidget />}
      >
        <RoutesJsx>
          <RouteJsx path="/" element={<Navigate to="/novedades" replace />} />
          <RouteJsx path="/novedades" element={<NovedadesPage />} />
          <RouteJsx path="/auditoria" element={<AuditoriaPage />} />
          <RouteJsx path="/solicitudes" element={<PlaceholderPage titulo="Solicitudes" />} />
          <RouteJsx path="/colaboradores" element={<PlaceholderPage titulo="Colaboradores" />} />
        </RoutesJsx>
      </GebAppLayout>
      <GebToast abierto={toast !== null} mensaje={toast ?? ""} onCerrar={() => setToast(null)} />
    </>
  );
}

/**
 * Landing con botón explícito "Iniciar sesión con Microsoft Entra ID" (fidelidad
 * al prototipo) — el redirect solo arranca al hacer click, vía `login()` de
 * `useAuth()`. Requiere `GebAuthProvider loginAutomatico={false}` (ver `App`).
 */
function PantallaSinSesion(): ReactNode {
  const { login } = useAuth();
  return <HubPeruLoginScreen logoSrc={LOGO_SRC} onIniciarSesion={() => void login()} />;
}

function AppAutenticada(): ReactNode {
  return (
    <RequireAuth cargando={splash} sinSesion={<PantallaSinSesion />}>
      <RolUiProvider>
        <AppShell />
      </RolUiProvider>
    </RequireAuth>
  );
}

export function App(): ReactNode {
  if (DEV_MOCK_AUTH_ACTIVO) {
    return (
      <GebThemeProvider>
        <BannerModoDev />
        <div style={{ paddingTop: 28 }}>
          <BrowserRouter>
            <DevMockAuthProvider>
              <AppAutenticada />
            </DevMockAuthProvider>
          </BrowserRouter>
        </div>
      </GebThemeProvider>
    );
  }

  let config;
  try {
    config = configDesdeEnv(import.meta.env);
  } catch (err) {
    return (
      <GebThemeProvider>
        <GebErrorState
          titulo="Falta configuración de Entra ID"
          descripcion={
            `${err instanceof Error ? err.message : "Error de configuración"}. ` +
            "Copiá apps/hub-peru/.env.example a .env y completá tus credenciales, " +
            "o poné VITE_DEV_MOCK_AUTH=true para probar sin Entra ID (dev)."
          }
        />
      </GebThemeProvider>
    );
  }

  return (
    <GebThemeProvider>
      <BrowserRouter>
        <GebAuthProvider config={config} cargando={splash} loginAutomatico={false}>
          <AppAutenticada />
        </GebAuthProvider>
      </BrowserRouter>
    </GebThemeProvider>
  );
}
