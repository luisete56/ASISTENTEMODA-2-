import { type WardrobeEventResponse } from "@shared/schemas";
import { storage } from "../02-database/storage";

export async function processWardrobeEvent(imagenCapturada?: string): Promise<WardrobeEventResponse> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const items = await storage.getAllClothingItems();
  
  if (items.length === 0) {
    return { action: "none" };
  }
  
  const shouldDetect = Math.random() > 0.7;
  
  if (!shouldDetect) {
    return { action: "none" };
  }
  
  const randomItem = items[Math.floor(Math.random() * items.length)];
  
  if (randomItem.estado === "dentro") {
    await storage.updateClothingItemStatus(randomItem.id, "fuera");
    return {
      action: "prenda_removida",
      prendaId: randomItem.id,
    };
  } else {
    await storage.updateClothingItemStatus(randomItem.id, "dentro");
    return {
      action: "prenda_detectada",
      prendaId: randomItem.id,
    };
  }
}
