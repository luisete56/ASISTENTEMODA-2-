const mockOutfitImages = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600",
  "https://images.unsplash.com/photo-1485968579169-a6e9dc7d4e9b?w=600",
  "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600",
];

export async function generateOutfitImage(description?: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  const randomIndex = Math.floor(Math.random() * mockOutfitImages.length);
  return mockOutfitImages[randomIndex];
}
