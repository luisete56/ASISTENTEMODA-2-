import type { Express } from "express";
import { processWardrobeEvent } from "./service";
import { wardrobeEventSchema } from "@shared/schemas";

export function registerVisionRoutes(app: Express) {
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
}
