import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// En local (sin REPL_ID) solo React; en Replit se cargan sus plugins (pueden fallar en tu máquina)
const plugins = [react()];
if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
  try {
    const runtimeErrorOverlay = (await import("@replit/vite-plugin-runtime-error-modal")).default;
    plugins.push(runtimeErrorOverlay());
  } catch (_) {}
  try {
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    plugins.push(await cartographer());
  } catch (_) {}
  try {
    const { devBanner } = await import("@replit/vite-plugin-dev-banner");
    plugins.push(await devBanner());
  } catch (_) {}
}

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "..", "05-web", "client", "src"),
      "@shared": path.resolve(__dirname, "..", "shared"),
      "@assets": path.resolve(__dirname, "..", "docs", "assets"),
    },
  },
  root: path.resolve(__dirname, "..", "05-web", "client"),
  build: {
    outDir: path.resolve(__dirname, "..", "dist", "public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
