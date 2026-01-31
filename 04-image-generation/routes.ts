import type { Express } from "express";
import { generateOutfitImage } from "./service";

export function registerImageGenerationRoutes(app: Express) {
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
}
