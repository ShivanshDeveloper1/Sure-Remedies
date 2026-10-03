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
    <section className="overflow-hidden bg-hero">
      <div className="page-container grid min-h-[36rem] items-center gap-12 py-16 sm:py-20 lg:min-h-[39rem] lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 lg:py-24">
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow">
            <span className="mr-2 inline-block size-2 rounded-full bg-purple align-middle" />
            {eyebrow}
          </p>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.04] tracking-[-0.065em] text-ink sm:text-6xl lg:text-[4.6rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
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
            aria-label="A collection of thoughtfully chosen essentials"
            className="hero-art relative mx-auto aspect-[1.06] w-full max-w-[34rem]"
            role="img"
          >
            <div className="hero-sun" />
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            <div className="hero-leaf hero-leaf-one" />
            <div className="hero-leaf hero-leaf-two" />
            <div className="hero-product hero-product-back">
              <span>thoughtful</span>
              <strong>everyday</strong>
              <i />
            </div>
            <div className="hero-product hero-product-front">
              <span>Boonvet Formulations</span>
              <div className="hero-product-stamp">S</div>
              <strong>good things<br />for every day</strong>
            </div>
            <div className="hero-note">
              <span className="hero-note-star">✳</span>
              <span>made for<br />your everyday</span>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
