import "server-only";

export function getWhatsAppUrl(message: string) {
  const configuredPhone = process.env.WHATSAPP_PHONE?.trim();

  if (!configuredPhone) {
    return null;
  }

  if (!/^\+?[\d\s().-]+$/.test(configuredPhone)) {
    throw new Error(
      "WHATSAPP_PHONE must contain an international number with digits only, optionally formatted with +, spaces, parentheses, periods, or hyphens.",
    );
  }

  const phone = configuredPhone.replace(/\D/g, "");
  if (phone.length < 8 || phone.length > 15) {
    throw new Error("WHATSAPP_PHONE must contain 8 to 15 digits.");
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
