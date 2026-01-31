import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const clothingItems = pgTable("clothing_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nombre: text("nombre").notNull(),
  imagenReferencia: text("imagen_referencia"),
  embeddings: text("embeddings"),
  estado: text("estado").notNull().default("dentro"),
  imagenCuerpoUsuario: text("imagen_cuerpo_usuario"),
});

export const insertClothingItemSchema = createInsertSchema(clothingItems).omit({
  id: true,
});

export type InsertClothingItem = z.infer<typeof insertClothingItemSchema>;
export type ClothingItem = typeof clothingItems.$inferSelect;
