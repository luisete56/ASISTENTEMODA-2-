import { type ClothingItem, type InsertClothingItem } from "./schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllClothingItems(): Promise<ClothingItem[]>;
  getClothingItem(id: string): Promise<ClothingItem | undefined>;
  createClothingItem(item: InsertClothingItem): Promise<ClothingItem>;
  updateClothingItemStatus(id: string, estado: string): Promise<ClothingItem | undefined>;
}

export class MemStorage implements IStorage {
  private clothingItems: Map<string, ClothingItem>;

  constructor() {
    this.clothingItems = new Map();
    
    const sampleItems: InsertClothingItem[] = [
      {
        nombre: "Camisa Azul",
        imagenReferencia: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300",
        estado: "dentro",
        embeddings: null,
        imagenCuerpoUsuario: null,
      },
      {
        nombre: "Pantalón Negro",
        imagenReferencia: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300",
        estado: "dentro",
        embeddings: null,
        imagenCuerpoUsuario: null,
      },
      {
        nombre: "Vestido Rojo",
        imagenReferencia: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300",
        estado: "fuera",
        embeddings: null,
        imagenCuerpoUsuario: null,
      },
    ];

    sampleItems.forEach((item) => {
      const id = randomUUID();
      const clothingItem: ClothingItem = { 
        id,
        nombre: item.nombre,
        imagenReferencia: item.imagenReferencia ?? null,
        embeddings: item.embeddings ?? null,
        estado: item.estado ?? "dentro",
        imagenCuerpoUsuario: item.imagenCuerpoUsuario ?? null,
      };
      this.clothingItems.set(id, clothingItem);
    });
  }

  async getAllClothingItems(): Promise<ClothingItem[]> {
    return Array.from(this.clothingItems.values());
  }

  async getClothingItem(id: string): Promise<ClothingItem | undefined> {
    return this.clothingItems.get(id);
  }

  async createClothingItem(insertItem: InsertClothingItem): Promise<ClothingItem> {
    const id = randomUUID();
    const item: ClothingItem = { 
      id,
      nombre: insertItem.nombre,
      imagenReferencia: insertItem.imagenReferencia ?? null,
      embeddings: insertItem.embeddings ?? null,
      estado: insertItem.estado ?? "dentro",
      imagenCuerpoUsuario: insertItem.imagenCuerpoUsuario ?? null,
    };
    this.clothingItems.set(id, item);
    return item;
  }

  async updateClothingItemStatus(id: string, estado: string): Promise<ClothingItem | undefined> {
    const item = this.clothingItems.get(id);
    if (!item) return undefined;
    
    const updatedItem = { ...item, estado };
    this.clothingItems.set(id, updatedItem);
    return updatedItem;
  }
}

export const storage = new MemStorage();
