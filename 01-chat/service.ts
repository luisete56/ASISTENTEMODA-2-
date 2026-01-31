import { type ChatMessage } from "@shared/schemas";

const mockResponses: ChatMessage[] = [
  {
    type: "text",
    content: "Para una reunión de trabajo, te recomiendo combinar tu camisa azul con el pantalón negro. Es un look profesional y elegante.",
  },
  {
    type: "text",
    content: "El vestido rojo es perfecto para una cena especial. Puedes complementarlo con accesorios dorados.",
  },
  {
    type: "image",
    content: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
  },
  {
    type: "text",
    content: "Para un día casual, te sugiero una combinación de jeans con una camiseta básica. La comodidad es clave.",
  },
  {
    type: "text",
    content: "He analizado tu armario y tienes 3 prendas registradas. ¿Te gustaría que te sugiera un outfit?",
  },
];

export async function getChatResponse(message: string): Promise<ChatMessage> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("trabajo") || lowerMessage.includes("reunión") || lowerMessage.includes("oficina")) {
    return mockResponses[0];
  }
  
  if (lowerMessage.includes("cena") || lowerMessage.includes("fiesta") || lowerMessage.includes("especial")) {
    return mockResponses[1];
  }
  
  if (lowerMessage.includes("look") || lowerMessage.includes("outfit") || lowerMessage.includes("imagen")) {
    return mockResponses[2];
  }
  
  if (lowerMessage.includes("casual") || lowerMessage.includes("día") || lowerMessage.includes("cómodo")) {
    return mockResponses[3];
  }
  
  if (lowerMessage.includes("armario") || lowerMessage.includes("prendas") || lowerMessage.includes("inventario")) {
    return mockResponses[4];
  }
  
  const randomIndex = Math.floor(Math.random() * mockResponses.length);
  return mockResponses[randomIndex];
}
