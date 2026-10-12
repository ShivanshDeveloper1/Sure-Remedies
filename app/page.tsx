import Link from "next/link";
import { Hero } from "@/components/hero";
import { ProductSection } from "@/components/product-section";
import { getPublicCatalog } from "@/lib/catalog";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { ImageSlider } from "@/components/image-slider";

export const dynamic = "force-dynamic";

const reasons = [
  {
    number: "01",
    title: "Practical industry knowledge",
    description:
      "A practical understanding of animal nutrition informs the products and support we provide to our customers.",
  },
  {
    number: "02",
    title: "Quality and consistency",
    description:
      "Our commitment to quality and consistency ensures that every product in our catalogue meets high standards.",
  },
  {
    number: "03",
    title: "Direct communication",
    description:
      "Our team is available to answer product enquiries and help you find the right information from our catalogue.",
  },
];

export default async function Home() {
  const { products } = await getPublicCatalog();

  return (
    <>
      {/* Banner image slider */}
      <ImageSlider />

      {/* Hero section */}
      <Hero
        eyebrow="Animal nutrition · Feed supplements"
        title={
          <>
            Practical nutrition
            <br />
            <span className="text-[--forest]">for livestock care.</span>
          </>
        }
        description="Boonvet Formulations manufactures animal feed supplements based in Saharanpur, Uttar Pradesh. Explore our product range or contact us directly with an enquiry."
        primaryHref="/products"
        primaryLabel="Explore our products"
        secondaryHref="/about"
        secondaryLabel="About Boonvet"
        artwork
      />

      {/* About / Mission section */}
      <section className="section-space" style={{ background: "var(--ivory)" }}>
        <div className="page-container grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <p className="eyebrow">Animal nutrition and feed solutions</p>
            <h2 className="section-title mt-4">
              A practical focus
              <br />
              <span style={{ color: "var(--forest)" }}>on animal nutrition.</span>
            </h2>
          </div>
          <div className="max-w-xl md:justify-self-end">
            <p className="text-lg leading-8 text-muted">
              Armed with practical knowledge and a dedicated team, Boonvet
              Formulations focuses on manufacturing products for the animal
              feed supplement industry. Browse the products currently
              available in our catalogue.
            </p>
            <Link
              className="text-link mt-6 inline-flex"
              href="/about"
            >
              More about the company <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Products section */}
      <ProductSection
        eyebrow="From our catalogue"
        title="Products for animal nutrition."
        description="Browse products currently published in the Boonvet Formulations catalogue."
        products={products}
        href="/products"
        linkLabel="View all products"
      />

      {/* Approach / Why Boonvet */}
      <section
        className="section-space"
        style={{ background: "var(--ink)", color: "white" }}
      >
        <div className="page-container">
          <div className="max-w-2xl">
            <p className="eyebrow" style={{ color: "var(--leaf-lt)" }}>
              Our approach
            </p>
            <h2 className="section-title mt-4" style={{ color: "white" }}>
              Focused on useful,
              <br />
              reliable nutrition products.
            </h2>
          </div>
          <div
            className="mt-12 grid gap-8 border-t pt-8 md:grid-cols-3 md:gap-10"
            style={{ borderColor: "rgba(255,255,255,0.12)" }}
          >
            {reasons.map((reason) => (
              <article key={reason.number}>
                <p
                  className="text-sm font-bold tracking-[0.18em]"
                  style={{ color: "var(--leaf-lt)" }}
                >
                  {reason.number}
                </p>
                <h3 className="mt-5 text-xl font-semibold leading-snug">
                  {reason.title}
                </h3>
                <p
                  className="mt-3 leading-7"
                  style={{ color: "rgba(255,255,255,0.62)" }}
                >
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA banner */}
      <section className="section-space" style={{ background: "var(--ivory)" }}>
        <div className="page-container">
          <div
            className="rounded-[2rem] p-8 sm:p-12 lg:flex lg:items-center lg:justify-between lg:p-16"
            style={{ background: "var(--sage-bg)" }}
          >
            <div className="max-w-2xl">
              <p className="eyebrow">Product enquiries</p>
              <h2 className="section-title mt-4">
                Have a question about
                <br />
                our products?
              </h2>
              <p className="mt-4 max-w-lg leading-7 text-muted">
                Contact our team for information about products in the current
                catalogue. We are glad to answer questions and discuss your needs.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col lg:items-end">
              <WhatsAppLink
                className="button-primary"
                message="Hello, I'd like to learn more about Boonvet Formulations."
              >
                Chat on WhatsApp <span aria-hidden="true">↗</span>
              </WhatsAppLink>
              <Link className="button-outline" href="/contact">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
