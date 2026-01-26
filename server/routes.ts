import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getChatResponse } from "./services/chatService";
import { processWardrobeEvent } from "./services/visionService";
import { generateOutfitImage } from "./services/imageGenerationService";
import { chatRequestSchema, insertClothingItemSchema, wardrobeEventSchema } from "@shared/schema";

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
  
  app.post("/api/chat", async (req, res) => {
    try {
      const parsed = chatRequestSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Mensaje inválido", 
          details: parsed.error.errors 
        });
      }
      
      const response = await getChatResponse(parsed.data.message);
      return res.json(response);
    } catch (error) {
      console.error("Error en /api/chat:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  app.get("/api/wardrobe", async (_req, res) => {
    try {
      const items = await storage.getAllClothingItems();
      return res.json(items);
    } catch (error) {
      console.error("Error en GET /api/wardrobe:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  app.post("/api/wardrobe", async (req, res) => {
    try {
      const parsed = insertClothingItemSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Datos de prenda inválidos", 
          details: parsed.error.errors 
        });
      }
      
      const item = await storage.createClothingItem(parsed.data);
      return res.status(201).json(item);
    } catch (error) {
      console.error("Error en POST /api/wardrobe:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  app.post("/api/wardrobe/event", async (req, res) => {
    try {
      const parsed = wardrobeEventSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Evento inválido", 
          details: parsed.error.errors 
        });
      }
      
      const response = await processWardrobeEvent(parsed.data.imagenCapturada);
      return res.json(response);
    } catch (error) {
      console.error("Error en POST /api/wardrobe/event:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  app.post("/api/generate-outfit", async (req, res) => {
    try {
      const { description } = req.body;
      const imageUrl = await generateOutfitImage(description);
      return res.json({ 
        type: "image",
        content: imageUrl 
      });
    } catch (error) {
      console.error("Error en POST /api/generate-outfit:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  return httpServer;
}
