import type { Express } from "express";
import { storage } from "./storage";
import { insertClothingItemSchema } from "./schema";

export function registerDatabaseRoutes(app: Express) {
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
}
