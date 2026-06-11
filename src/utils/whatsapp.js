import { siteConfig } from '../config/siteConfig';

export function buildWhatsAppLink(message = '') {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function buildContactWhatsAppLink() {
  return buildWhatsAppLink();
}

export function buildPackageWhatsAppLink(packageName, price) {
  const message = `Hola, como estas? Me interesa el paquete: "${packageName}" ${formatPrice(price)}. Muchas gracias`;
  return buildWhatsAppLink(message);
}

export function formatPrice(amount) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}
