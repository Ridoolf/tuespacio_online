import { siteConfig } from '../config/siteConfig';

export function buildWhatsAppLink(message = '') {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function buildContactWhatsAppLink() {
  return buildWhatsAppLink();
}

export function buildPlanWhatsAppLink(planName, price) {
  const priceText = price !== null ? formatPrice(price) : 'A consultar';
  const message = `Hola, como estas? Me interesa el paquete: "${planName}" ${priceText}. ¿Podemos charlar?`;
  return buildWhatsAppLink(message);
}

export function buildFormWhatsAppLink(name, message, phone = '') {
  let text = `Hola, soy ${name}. ${message}`;
  if (phone) text += `\nTel: ${phone}`;
  return buildWhatsAppLink(text);
}

export function formatPrice(amount) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}
