
export function getWhatsAppUrl(message: string) {
   const phone = "917942720013";

  if (!phone) return null;

  const digits = phone.replace(/\D/g, "");

  if (digits.length < 8 || digits.length > 15) {
    throw new Error("Invalid WhatsApp phone number.");
  }

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
