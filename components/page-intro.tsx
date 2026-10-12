import type { ReactNode } from "react";

type PageIntroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 lg:py-28"
      style={{
        background:
          "linear-gradient(148deg, #e8f4ec 0%, #f0f7f2 40%, #faf9f5 100%)",
      }}
    >
      {/* Decorative circle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-80 w-80 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(58,140,92,0.15) 0%, transparent 70%)",
        }}
      />
      <div className="page-container relative">
        <p className="eyebrow">
          <span
            className="mr-2 inline-block size-2 rounded-full align-middle"
            style={{ background: "var(--leaf)" }}
            aria-hidden="true"
          />
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[1.05] tracking-[-0.07em] text-ink sm:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {description}
        </p>
      </div>
    </section>
  );
}
