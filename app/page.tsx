import Link from "next/link";
import { Hero } from "@/components/hero";
import { ProductSection } from "@/components/product-section";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { ImageSlider } from "@/components/image-slider";
import { getPublicCatalog } from "@/lib/catalog";

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

export const dynamic = "force-dynamic";

export default async function Home() {
  const { products } = await getPublicCatalog();

  return (
    <div className="bg-[var(--bg-main)] text-[var(--ink)] antialiased overflow-x-hidden selection:bg-[var(--forest)] selection:text-white">
      {/* Banner image slider wrapper */}
      <div className="relative w-full overflow-hidden bg-slate-950 shadow-2xl">
        <ImageSlider />
      </div>

      {/* Hero section */}
      <Hero
        eyebrow="Animal nutrition · Feed supplements"
        title={
          <>
            Practical nutrition
            <br />
            <span className="text-[var(--forest)] bg-gradient-to-r from-[var(--forest)] via-[#2d6a4f] to-[var(--leaf)] bg-clip-text text-transparent">
              for livestock care.
            </span>
          </>
        }
        description="Boonvet Formulations manufactures high-quality animal feed supplements based in Saharanpur, Uttar Pradesh. Explore our catalogue or reach out directly."
        primaryHref="/products"
        primaryLabel="Explore our products"
        secondaryHref="/about"
        secondaryLabel="About Boonvet"
        artwork
      />

      {/* About / Mission section */}
      <section className="py-24 md:py-32 bg-[var(--ivory)] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[var(--forest)] opacity-[0.03] blur-[140px] pointer-events-none rounded-full" />
        <div className="page-container grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-center relative z-10">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[var(--forest)]/10 text-[var(--forest)] border border-[var(--forest)]/20 shadow-sm">
              🌿 Trusted Manufacturer
            </span>
            <h2 className="section-title mt-6 text-3xl md:text-5xl font-black tracking-tight leading-[1.15]">
              A practical focus
              <br />
              <span className="text-[var(--forest)]">on animal nutrition.</span>
            </h2>
          </div>
          <div className="max-w-xl md:justify-self-end">
            <p className="text-lg md:text-xl leading-relaxed text-slate-700 font-normal">
              Armed with practical knowledge and a dedicated team, Boonvet
              Formulations focuses on manufacturing products for the animal
              feed supplement industry. Browse the products currently
              available in our catalogue.
            </p>
            <div className="mt-8">
              <Link
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white border border-[var(--border)] font-bold text-[var(--forest)] shadow-md hover:shadow-lg hover:border-[var(--forest)] transition-all duration-300"
                href="/about"
              >
                <span>More about the company</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </div>
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
      <section className="py-28 bg-[var(--ink)] text-white relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[var(--forest)] opacity-25 blur-[150px] pointer-events-none rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[var(--gold)] opacity-15 blur-[150px] pointer-events-none rounded-full" />

        <div className="page-container relative z-10 text-white">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white/10 text-[var(--leaf-lt)] border border-white/15 shadow-sm">
              ⚡ Our Approach
            </span>
            <h2 className="section-title mt-6 text-3xl md:text-5xl font-black tracking-tight text-white leading-[1.15]">
              Focused on useful,
              <br />
              reliable nutrition products.
            </h2>
          </div>

          <div className="mt-16 grid gap-8 border-t border-white/10 pt-16 md:grid-cols-3 md:gap-8">
            {reasons.map((reason) => (
              <article
                key={reason.number}
                className="group relative p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl hover:border-[var(--forest)] transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute top-6 right-6 w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--gold)] font-black text-sm">
                  {reason.number}
                </div>
                <h3 className="mt-8 text-xl font-bold leading-snug text-white group-hover:text-[var(--leaf-lt)] transition-colors">
                  {reason.title}
                </h3>
                <p className="mt-4 leading-relaxed text-slate-300 text-sm md:text-base">
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA banner */}
      <section className="py-24 bg-[var(--ivory)] relative overflow-hidden">
        <div className="page-container">
          <div className="rounded-[3rem] p-10 sm:p-14 lg:p-18 lg:flex lg:items-center lg:justify-between border border-[var(--border)] shadow-2xl relative overflow-hidden bg-gradient-to-br from-white via-[var(--sage-bg,#f0f4f1)] to-[var(--ivory)]">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[var(--forest)] opacity-10 blur-[100px] pointer-events-none rounded-full" />
            
            <div className="max-w-2xl relative z-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider text-[var(--forest)] uppercase bg-[var(--forest)]/10 border border-[var(--forest)]/20 shadow-sm">
                💬 Direct Support
              </span>
              <h2 className="section-title mt-5 text-3xl md:text-4xl font-black tracking-tight leading-tight text-[var(--ink)]">
                Have a question about
                <br />
                our products?
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-slate-600 text-base md:text-lg">
                Contact our team for information about products in the current
                catalogue. We are glad to answer questions and discuss your needs.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row lg:mt-0 lg:flex-col lg:items-end relative z-10">
              <WhatsAppLink
                className="button-primary inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold bg-[var(--forest)] text-white shadow-xl hover:bg-[var(--forest-dark,#1b4332)] hover:scale-[1.02] transition-all duration-300"
                message="Hello, I'd like to learn more about Boonvet Formulations."
              >
                <span>Chat on WhatsApp</span>
                <span aria-hidden="true" className="font-normal">↗</span>
              </WhatsAppLink>
              <Link
                className="button-outline inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold border-2 border-[var(--forest)] text-[var(--forest)] hover:bg-[var(--forest)] hover:text-white transition-all duration-300 shadow-sm"
                href="/contact"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}