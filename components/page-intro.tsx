import type { ReactNode } from "react";

type PageIntroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="bg-hero py-16 sm:py-20 lg:py-24">
      <div className="page-container">
        <p className="eyebrow">
          <span className="mr-2 inline-block size-2 rounded-full bg-purple align-middle" />
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.065em] text-ink sm:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {description}
        </p>
      </div>
    </section>
  );
}
