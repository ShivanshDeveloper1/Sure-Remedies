import Link from "next/link";
import { CategoryCards } from "@/components/category-cards";
import { Hero } from "@/components/hero";
import { ProductSection } from "@/components/product-section";
import { getPublicCatalog } from "@/lib/catalog";
import { WhatsAppLink } from "@/components/whatsapp-link";

export const dynamic = "force-dynamic";

const reasons = [
  {
    number: "01",
    title: "Practical industry knowledge",
    description:
      "A practical understanding of animal nutrition informs the products and support we provide.",
  },
  {
    number: "02",
    title: "Quality and consistency",
    description:
      "A focus on quality and consistency across animal nutrition products.",
  },
  {
    number: "03",
    title: "Direct communication",
    description:
      "Our team is available to answer product enquiries and help you find catalogue information.",
  },
];

export default async function Home() {
  const { categories, products } = await getPublicCatalog();

  return (
    <>
      <Hero
        eyebrow="Animal nutrition · Feed supplements"
        title={
          <>
            Practical nutrition
            <br />
            <span className="text-purple">for livestock care.</span>
          </>
        }
        description="Boonvet Formulations is an animal feed supplement manufacturer based in Saharanpur, Uttar Pradesh. Explore our product range or contact us with an enquiry."
        primaryHref="/products"
        primaryLabel="Explore our products"
        secondaryHref="/about"
        secondaryLabel="About Boonvet"
        artwork
      />

      <section className="section-space">
        <div className="page-container grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="eyebrow">Animal nutrition and feed solutions</p>
            <h2 className="section-title mt-4">
              A practical focus
              <br />
              <span className="text-purple">on animal nutrition.</span>
            </h2>
          </div>
          <div className="max-w-xl md:justify-self-end">
            <p className="text-lg leading-8 text-muted">
              Armed with practical knowledge and a dedicated team, Boonvet
              Formulations focuses on manufacturing products for the animal
              feed supplement industry. Browse the catalogue to see the
              categories and products currently available.
            </p>
            <Link className="text-link mt-6 inline-flex" href="/about">
              More about the company <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-space bg-soft">
        <div className="page-container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Browse the catalogue</p>
              <h2 className="section-title mt-3">Explore product categories</h2>
            </div>
            <Link className="text-link" href="/products">
              View all products <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <CategoryCards categories={categories} />
        </div>
      </section>

      <ProductSection
        eyebrow="From our catalogue"
        title="Products for animal nutrition."
        description="Browse products currently published in the Boonvet Formulations catalogue."
        products={products.slice(0, 3)}
        href="/products"
        linkLabel="View all products"
      />

      <section className="section-space bg-ink text-white">
        <div className="page-container">
          <div className="max-w-xl">
            <p className="eyebrow text-mint">Our approach</p>
            <h2 className="section-title mt-4 text-white">
              Focused on useful,
              <br />
              reliable nutrition products.
            </h2>
          </div>
          <div className="mt-12 grid gap-8 border-t border-white/15 pt-8 md:grid-cols-3 md:gap-10">
            {reasons.map((reason) => (
              <article key={reason.number}>
                <p className="text-sm font-semibold tracking-[0.16em] text-mint">
                  {reason.number}
                </p>
                <h3 className="mt-5 text-xl font-semibold">{reason.title}</h3>
                <p className="mt-3 leading-7 text-white/65">
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-container">
          <div className="rounded-[2rem] bg-mint p-8 sm:p-12 lg:flex lg:items-center lg:justify-between lg:p-16">
            <div className="max-w-2xl">
              <p className="eyebrow text-purple">Product enquiries</p>
              <h2 className="section-title mt-4">
                Have a question about our products?
              </h2>
              <p className="mt-4 max-w-lg leading-7 text-muted">
                Contact our team for information about products in the current
                catalogue.
              </p>
            </div>
            <WhatsAppLink
              className="button-primary mt-8 lg:mt-0"
              message="Hello, I'd like to learn more about Boonvet Formulations."
            >
              Chat on WhatsApp <span aria-hidden="true">↗</span>
            </WhatsAppLink>
          </div>
        </div>
      </section>
    </>
  );
}
