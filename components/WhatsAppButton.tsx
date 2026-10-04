
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const href = getWhatsAppUrl(
    "Hello, I'd like to learn more about Boonvet Formulations."
  );

  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="whatsapp-float"
    >
      <MessageCircle
        size={30}
        strokeWidth={2.4}
        fill="white"
        className="text-white"
      />

      <span
        className="whatsapp-float-dot"
        aria-hidden="true"
      />
    </a>
  );
}
