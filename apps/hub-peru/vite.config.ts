import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174
  },
  resolve: {
    // Una sola copia de React/MUI/emotion — evita hooks duplicados al
    // consumir @geb/ui, @geb/auth y @geb/offline desde el workspace.
    dedupe: ["react", "react-dom", "@mui/material", "@emotion/react", "@emotion/styled"]
  }
});
