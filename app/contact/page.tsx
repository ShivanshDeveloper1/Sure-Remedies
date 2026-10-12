import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { MapPin, Phone, Mail, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Boonvet Formulations for animal nutrition and product enquiries.",
};

export const dynamic = "force-dynamic";

const contactItems = [
  {
    icon: Phone,
    label: "Phone",
    value: "7017566608",
    href: "tel:7017566608",
  },
  {
    icon: Mail,
    label: "Email",
    value: "boonvetformulations@gmail.com",
    href: "mailto:boonvetformulations@gmail.com",
  },
  {
    icon: MapPin,
    label: "Address",
    value:
      "E-1 Industrial Estate, Near ITI, Delhi Road, Saharanpur (U.P.) India",
    href: null,
  },
  {
    icon: FileText,
    label: "GST No.",
    value: "09CVMPA2410H1ZW",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact Boonvet Formulations"
        title={
          <>
            Product questions?
            <br />
            <span style={{ color: "var(--forest)" }}>We are here to help.</span>
          </>
        }
        description="Contact our team for information about the animal nutrition products in our catalogue."
      />

      <section className="section-space" style={{ background: "var(--ivory)" }}>
        <div className="page-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left: enquiry */}
          <div className="max-w-2xl">
            <p className="eyebrow">Product enquiries</p>
            <h2 className="section-title mt-3">Get in touch with our team.</h2>
            <p className="mt-5 leading-7 text-muted">
              For product information, call us or send an enquiry on WhatsApp.
              We will be glad to hear from you and provide information about any
              product in our catalogue.
            </p>
            <WhatsAppLink
              className="button-primary mt-7"
              message="Hello, I'd like to get in touch with Boonvet Formulations."
            >
              Enquire on WhatsApp <span aria-hidden="true">↗</span>
            </WhatsAppLink>
          </div>

          {/* Right: details card */}
          <aside
            className="rounded-3xl p-7 sm:p-9"
            style={{ background: "var(--sage-bg)" }}
          >
            <p className="eyebrow">Business details</p>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-ink">
              Boonvet Formulations
            </h3>
            <p className="mt-1 text-sm text-muted">SHUBHAM ANEJA · Owner</p>

            <ul className="mt-6 space-y-4">
              {contactItems.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{
                      background: "rgba(26,77,60,0.1)",
                      color: "var(--forest)",
                    }}
                  >
                    <item.icon size={15} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-0.5 block text-sm font-medium text-ink transition-colors hover:text-forest"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm text-ink">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
