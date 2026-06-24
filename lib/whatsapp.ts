import type { Settings } from './types';

export function getWhatsAppUrl(settings: Settings, message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${settings.whatsapp_number}?text=${encoded}`;
}

export const DEFAULT_MESSAGE = "Hi! I'd like to learn more about your tropical herbal products.";
export const CONSULT_MESSAGE = "Hi! I'd like to book a consultation about your traditional herbal remedies.";
export const ORDER_MESSAGE = "Hi! I'd like to place an order for your herbal products.";

export function getProductMessage(productName: string): string {
  return `Hi, I'm interested in ${productName}. Can you tell me more?`;
}

export function getOrderProductMessage(productName: string, price: string): string {
  return `Hi! I'd like to order ${productName}${price ? ` (${price})` : ''}. Please let me know how to proceed.`;
}
