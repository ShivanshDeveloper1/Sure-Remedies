
"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "919XXXXXXXXX"; // Replace with your WhatsApp number
  const message = encodeURIComponent(
    "Hi, I would like to know more about your services."
  );

  return (
    <Link
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="
        fixed
        bottom-5 right-5
        z-[9999]
        flex
        h-14 w-14
        items-center justify-center
        rounded-full
        bg-[#25D366]
        text-white
        shadow-[0_4px_18px_rgba(0,0,0,0.25)]
        transition-all
        duration-300
        hover:scale-110
        hover:shadow-[0_6px_24px_rgba(0,0,0,0.3)]
        active:scale-95
        sm:bottom-6 sm:right-6
      "
    >
      <MessageCircle
        size={30}
        strokeWidth={2.4}
        fill="white"
        className="text-white"
      />

      {/* Online-style notification dot */}
      <span
        className="
          absolute
          right-0.5 top-0.5
          h-3.5 w-3.5
          rounded-full
          border-2 border-white
          bg-[#25D366]
        "
        aria-hidden="true"
      />
    </Link>
  );
}

