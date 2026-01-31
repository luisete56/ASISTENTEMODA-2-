import express, { type Express } from "express";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../config/vite.config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root del cliente: desde 05-web/vite.ts, subir a raíz del proyecto y entrar en 05-web/client
const projectRoot = path.resolve(__dirname, "..");
const clientRoot = path.join(projectRoot, "05-web", "client");

export async function setupVite(server: Server, app: Express) {
  const port = Number(process.env.PORT) || 5000;
  const serverOptions = {
    middlewareMode: true,
    hmr: { server, path: "/vite-hmr" },
    allowedHosts: true as const,
    origin: `http://localhost:${port}`,
  };

  const { root: _r, server: _s, ...viteConfigRest } = viteConfig as Record<string, unknown> & { root?: string; server?: unknown };
  const vite = await createViteServer({
    ...viteConfigRest,
    configFile: false,
    root: clientRoot,
    base: "/",
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  // Ruta explícita para la imagen hero; path absoluto para Windows y rutas con espacios
  const publicDir = path.resolve(clientRoot, "public");
  const heroPath = path.resolve(publicDir, "hero.png");
  app.get("/hero.png", (_req, res) => {
    if (fs.existsSync(heroPath)) {
      res.type("image/png").sendFile(heroPath);
    } else {
      res.status(404).send("Not found");
    }
  });
  app.use(express.static(publicDir));
  app.use(vite.middlewares);

  // No servir HTML para rutas que debe atender Vite (/src/, /@vite/, etc.)
  const isAssetOrApi = (url: string) => {
    const p = url.split("?")[0];
    return (
      p.startsWith("/src/") ||
      p.startsWith("/@") ||
      p.startsWith("/node_modules/") ||
      p.startsWith("/api") ||
      p.startsWith("/health") ||
      p.startsWith("/vite-hmr")
    );
  };

  // Express 5 requiere nombre en el wildcard: *path en lugar de *
  app.get("*path", async (req, res, next) => {
    const url = req.originalUrl;
    if (isAssetOrApi(url)) {
      return next();
    }
    if (!req.accepts("html")) {
      return next();
    }

    try {
      const clientTemplate = path.resolve(
        __dirname,
        "client",
        "index.html",
      );

      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}
