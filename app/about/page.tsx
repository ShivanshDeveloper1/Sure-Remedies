import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Boonvet Formulations, an animal feed supplement manufacturer based in Saharanpur, Uttar Pradesh.",
};

const values = [
  {
    number: "01",
    title: "Practical knowledge",
    description:
      "A practical understanding of the animal feed supplement industry informs our work and product selection.",
  },
  {
    number: "02",
    title: "Product focus",
    description:
      "Our catalogue brings together animal nutrition products for customers to explore, compare, and enquire about.",
  },
  {
    number: "03",
    title: "A dedicated team",
    description:
      "We welcome product questions and enquiries from people looking for more information about our offerings.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About Boonvet Formulations"
        title={
          <>
            Practical focus.
            <br />
            <span style={{ color: "var(--forest)" }}>Animal nutrition.</span>
          </>
        }
        description="Boonvet Formulations is an animal feed supplement manufacturer based in Saharanpur, Uttar Pradesh, India."
      />

      {/* Mission */}
      <section className="section-space" style={{ background: "var(--ivory)" }}>
        <div className="page-container grid gap-12 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Our work</p>
            <h2 className="section-title mt-4">
              Supporting the
              <br />
              animal nutrition industry.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-muted">
            <p>
              Armed with practical knowledge and a dedicated team, Boonvet
              Formulations works in the animal feed supplement industry, with
              a focus on animal nutrition, product quality, and consistency.
              We provide clear catalogue information to people who enquire.
            </p>
            <p>
              Based in Saharanpur, Uttar Pradesh, we invite you to explore the
              products currently listed or contact us directly with questions.
            </p>
            <Link className="button-primary mt-2 inline-flex" href="/products">
              Explore products <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="section-space"
        style={{ background: "var(--ivory-dk)" }}
      >
        <div className="page-container">
          <p className="eyebrow">What guides our work</p>
          <h2 className="section-title mt-3">
            A practical, product-focused approach.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <article
                className="rounded-2xl border border-border bg-white p-7 sm:p-8"
                key={value.title}
              >
                <p
                  className="text-sm font-bold tracking-[0.18em]"
                  style={{ color: "var(--leaf)" }}
                >
                  {value.number}
                </p>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">
                  {value.title}
                </h3>
                <p className="mt-3 leading-7 text-muted">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
