import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { WhatsAppLink } from "@/components/whatsapp-link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Boonvet Formulations for animal nutrition and product enquiries.",
};

export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact Boonvet Formulations"
        title={
          <>
            Product questions?
            <br />
            <span className="text-purple">We are here to help.</span>
          </>
        }
        description="Contact our team for information about the animal nutrition products in our catalogue."
      />
      <section className="section-space">
        <div className="page-container grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <div className="max-w-2xl">
            <p className="eyebrow">Product enquiries</p>
            <h2 className="section-title mt-3">Get in touch with our team.</h2>
            <p className="mt-5 leading-7 text-muted">
              For product information, call us or send an enquiry on WhatsApp.
              We will be glad to hear from you.
            </p>
            <WhatsAppLink
              className="button-primary mt-7"
              message="Hello, I'd like to get in touch with Boonvet Formulations."
            >
              Enquire on WhatsApp <span aria-hidden="true">↗</span>
            </WhatsAppLink>
          </div>
          <aside className="rounded-3xl bg-soft p-7 sm:p-9">
            <p className="eyebrow">Business details</p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink">
              Boonvet Formulations
            </h3>
            <p className="mt-4 leading-7 text-muted">
              RAJIV KUMAR ANEJA | Owner
              <br />
              <a href="tel:07942720013">07942720013</a>
              <br />
              E-1, Boonvet Formulations, Delhi Road, Saharanpur Industrial Area, Near
              ITI, Saharanpur - 247001, Uttar Pradesh, India
              <br />
              GST: 09ASGPA2476C1Z2
              <br />
              <a
                href="https://www.google.com/maps?q=29.93007000,77.52741000"
                rel="noreferrer"
                target="_blank"
              >
                Google Maps: 29.93007000, 77.52741000
              </a>
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
