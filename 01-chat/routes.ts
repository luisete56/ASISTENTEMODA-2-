import type { Express } from "express";
import { getChatResponse } from "./service";
import { chatRequestSchema } from "@shared/schemas";

export function registerChatRoutes(app: Express) {
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
}
