import type { Express } from "express";
import { type Server } from "http";
import { registerChatRoutes } from "../01-chat/routes";
import { registerDatabaseRoutes } from "../02-database/routes";
import { registerVisionRoutes } from "../03-vision/routes";
import { registerImageGenerationRoutes } from "../04-image-generation/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Health check endpoint - must be first to ensure it's always available
  app.get("/health", (_req, res) => {
    res.status(200).json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      env: process.env.NODE_ENV || "unknown"
    });
  });

  app.get("/api/health", (_req, res) => {
    res.status(200).json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      env: process.env.NODE_ENV || "unknown"
    });
  });
  
  // Register routes from each module
  registerChatRoutes(app);
  registerDatabaseRoutes(app);
  registerVisionRoutes(app);
  registerImageGenerationRoutes(app);

  return httpServer;
}
