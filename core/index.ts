import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "../05-web/static";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

// Funciona en ESM (dev) y CJS (producción con esbuild)
let __dirnameComputed: string;
try {
  __dirnameComputed = path.dirname(fileURLToPath(import.meta.url));
} catch {
  __dirnameComputed = process.cwd();
}
const __dirname = __dirnameComputed;

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse: Record<string, unknown> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (reqPath.startsWith("/api")) {
      let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    // NODE_ENV is set by esbuild in production build, or defaults to development
    const nodeEnv = process.env.NODE_ENV || "development";
    
    console.log("Starting server...");
    console.log("NODE_ENV:", nodeEnv);

    await registerRoutes(httpServer, app);

    app.use((err: Error & { status?: number; statusCode?: number }, _req: Request, res: Response, next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      console.error("Internal Server Error:", err);

      if (res.headersSent) {
        return next(err);
      }

      return res.status(status).json({ message });
    });

    // Setup Vite in development, static serving in production
    if (nodeEnv === "production") {
      serveStatic(app);
    } else {
      const { setupVite } = await import("../05-web/vite");
      await setupVite(httpServer, app);
    }

    const port = parseInt(process.env.PORT || "5000", 10);
    
    httpServer.listen(port, "0.0.0.0", () => {
      log(`✓ Server is serving on port ${port}`);
      console.log(`✓ Server ready at http://localhost:${port}`);
    });

    httpServer.on("error", (err: NodeJS.ErrnoException) => {
      if (err.code === "EADDRINUSE") {
        log(`Port ${port} is already in use`);
      } else {
        log(`Server error: ${err.message}`);
      }
      process.exit(1);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      httpServer.close(() => process.exit(0));
    });

    process.on('SIGINT', () => {
      httpServer.close(() => process.exit(0));
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
