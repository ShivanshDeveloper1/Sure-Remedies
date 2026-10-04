import Link from "next/link";
import type { ReactNode } from "react";

type HeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  artwork?: boolean;
};

export function Hero({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  artwork = false,
}: HeroProps) {
  return (
    <section className="home-hero">
      <div className="page-container home-hero-inner">
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow">
            <span className="mr-2 inline-block size-2 rounded-full bg-brand-green align-middle" />
            {eyebrow}
          </p>
          <h1 className="home-hero-title mt-6">
            {title}
          </h1>
          <p className="home-hero-description mt-6 max-w-xl">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link className="button-primary" href={primaryHref}>
              {primaryLabel} <span aria-hidden="true">↗</span>
            </Link>
            {secondaryHref && secondaryLabel ? (
              <Link className="text-link" href={secondaryHref}>
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
        {artwork ? (
          <div
            aria-label="Boonvet Formulations animal nutrition and feed solutions"
            className="nutrition-visual"
            role="group"
          >
            <span className="nutrition-visual-orbit nutrition-visual-orbit-one" />
            <span className="nutrition-visual-orbit nutrition-visual-orbit-two" />
            <span className="nutrition-visual-mark" aria-hidden="true">B</span>
            <div className="nutrition-visual-caption">
              <span>BOONVET FORMULATIONS</span>
              <strong>Animal nutrition.<br />Thoughtfully made.</strong>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
