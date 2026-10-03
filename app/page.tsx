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
    title: "Thoughtfully selected",
    description:
      "Every item in our range is chosen with care, keeping quality and usefulness at the heart of it.",
  },
  {
    number: "02",
    title: "Made for everyday",
    description:
      "Practical products that fit naturally into your routine, without making the simple things complicated.",
  },
  {
    number: "03",
    title: "Here when you need us",
    description:
      "Have a question or looking for something specific? Our team is just a message away.",
  },
];

export default async function Home() {
  const { categories, products } = await getPublicCatalog();

  return (
    <>
      <Hero
        eyebrow="A little better, every day"
        title={
          <>
            Good things for
            <br />
            <span className="text-purple">everyday living.</span>
          </>
        }
        description="Discover a considered collection of useful, well-made essentials. Thoughtfully selected to bring a little more ease to the everyday."
        primaryHref="/products"
        primaryLabel="Explore our products"
        secondaryHref="/about"
        secondaryLabel="Get to know us"
        artwork
      />

      <section className="section-space">
        <div className="page-container grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="eyebrow">A thoughtful way to shop</p>
            <h2 className="section-title mt-4">
              Useful things.
              <br />
              <span className="text-purple">Chosen with care.</span>
            </h2>
          </div>
          <div className="max-w-xl md:justify-self-end">
            <p className="text-lg leading-8 text-muted">
              We believe the things we bring into our lives should earn their
              place. Our growing range is built around quality, care, and the
              little details that make everyday routines feel better.
            </p>
            <Link className="text-link mt-6 inline-flex" href="/about">
              More about our approach <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-space bg-soft">
        <div className="page-container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Find your next favourite</p>
              <h2 className="section-title mt-3">Explore our categories</h2>
            </div>
            <Link className="text-link" href="/products">
              View all products <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <CategoryCards categories={categories} />
        </div>
      </section>

      <ProductSection
        eyebrow="A few good things"
        title="Made to be part of your everyday."
        description="A closer look at some of the favourites in our growing collection."
        products={products.slice(0, 3)}
        href="/products"
        linkLabel="See the full collection"
      />

      <section className="section-space bg-ink text-white">
        <div className="page-container">
          <div className="max-w-xl">
            <p className="eyebrow text-mint">The Boonvet Formulations difference</p>
            <h2 className="section-title mt-4 text-white">
              A little more care
              <br />
              in the everyday.
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
              <p className="eyebrow text-purple">Let&apos;s talk</p>
              <h2 className="section-title mt-4">
                Looking for something
                <br className="hidden sm:block" /> in particular?
              </h2>
              <p className="mt-4 max-w-lg leading-7 text-muted">
                We&apos;re happy to help with product questions, recommendations,
                or anything else you have in mind.
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
