import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Boonvet Formulations and our thoughtful approach to everyday essentials.",
};

const values = [
  {
    title: "Choose with intention",
    description:
      "We look for useful products with thoughtful details and a place in real everyday routines.",
  },
  {
    title: "Keep it considered",
    description:
      "A good range does not need to be complicated. We focus on quality, clarity, and the essentials.",
  },
  {
    title: "Make it personal",
    description:
      "Good service starts with listening. We are here to help you find the right fit for your needs.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="A little about us"
        title={
          <>
            Everyday, with
            <br />
            <span className="text-purple">a little more thought.</span>
          </>
        }
        description="Boonvet Formulations is based in Saharanpur, Uttar Pradesh, India, and is owned by RAJIV KUMAR ANEJA."
      />
      <section className="section-space">
        <div className="page-container grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Our point of view</p>
            <h2 className="section-title mt-4">
              Good products make
              <br />
              everyday life easier.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-muted">
            <p>
              Boonvet Formulations, E-1, Boonvet Formulations, Delhi Road, Saharanpur
              Industrial Area, Near ITI, Saharanpur - 247001, Uttar Pradesh,
              India.
            </p>
            <p>
              GST No. 09ASGPA2476C1Z2. For enquiries, call 07942720013.
            </p>
            <Link className="button-primary mt-2" href="/products">
              Explore the collection <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="section-space bg-soft">
        <div className="page-container">
          <p className="eyebrow">What matters to us</p>
          <h2 className="section-title mt-3">A few things we believe in.</h2>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {values.map((value, index) => (
              <article
                className="rounded-3xl bg-white p-7 sm:p-8"
                key={value.title}
              >
                <p className="text-sm font-semibold tracking-[0.16em] text-purple">
                  0{index + 1}
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
