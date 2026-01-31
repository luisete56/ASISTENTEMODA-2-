import { z } from "zod";

export const chatMessageSchema = z.object({
  type: z.enum(["text", "image"]),
  content: z.string(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const chatRequestSchema = z.object({
  message: z.string().min(1, "El mensaje no puede estar vacío"),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;

export const wardrobeEventSchema = z.object({
  imagenCapturada: z.string().optional(),
  timestamp: z.string().optional(),
});

export type WardrobeEvent = z.infer<typeof wardrobeEventSchema>;

export const wardrobeEventResponseSchema = z.object({
  action: z.enum(["none", "prenda_detectada", "prenda_removida"]),
  prendaId: z.string().optional(),
});

export type WardrobeEventResponse = z.infer<typeof wardrobeEventResponseSchema>;
