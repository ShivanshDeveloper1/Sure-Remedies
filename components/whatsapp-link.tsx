import type { ReactNode } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

type WhatsAppLinkProps = {
  className: string;
  children: ReactNode;
} & (
  | { productName: string; message?: never }
  | { message: string; productName?: never }
);

export function WhatsAppLink({
  className,
  children,
  message,
  productName,
}: WhatsAppLinkProps) {
  const enquiryMessage =
    message ?? `Hello, I'm interested in ${productName}.`;
  const href = getWhatsAppUrl(enquiryMessage);

  if (!href) {
    return (
      <span
        aria-disabled="true"
        className={`${className} cursor-not-allowed opacity-60`}
        title="Set WHATSAPP_PHONE in the environment to enable WhatsApp enquiries."
      >
        {children}
      </span>
    );
  }

  return (
    <a className={className} href={href} rel="noreferrer" target="_blank">
      {children}
    </a>
  );
}
