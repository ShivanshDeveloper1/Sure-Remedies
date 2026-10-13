import Link from "next/link";
import type { Product } from "@/lib/site-data";
import { ProductCard } from "@/components/product-card";

type ProductSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  products: Product[];
  href?: string;
  linkLabel?: string;
};

export function ProductSection({
  eyebrow,
  title,
  description,
  products = [],
  href,
  linkLabel,
}: ProductSectionProps) {
  return (
    <section 
      className="py-24 relative overflow-hidden" 
      style={{ background: "var(--ivory-dk, #f4f5f0)" }}
    >
      {/* Subtle ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--forest)] opacity-5 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--gold)] opacity-5 blur-[100px] pointer-events-none rounded-full" />

      <div className="page-container relative z-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-[var(--border, #e2e8f0)] pb-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[var(--forest)]/10 text-[var(--forest)] border border-[var(--forest)]/20 mb-4 shadow-sm">
              ✨ {eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--ink, #0f172a)]">
              {title}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              {description}
            </p>
          </div>
          {href && linkLabel ? (
            <Link 
              className="group inline-flex items-center gap-2 text-sm font-bold text-[var(--forest)] hover:opacity-80 transition-all duration-200" 
              href={href}
            >
              <span>{linkLabel}</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1" aria-hidden="true">
                ↗
              </span>
            </Link>
          ) : null}
        </div>

        {products && products.length > 0 ? (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div 
                key={product.slug}
                className="group relative transition-all duration-300 hover:-translate-y-2"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white/80 backdrop-blur-md p-12 text-center shadow-lg">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--forest)]/10 flex items-center justify-center text-[var(--forest)] text-xl">
              📦
            </div>
            <p className="text-base font-bold text-slate-800">There are no products to show just yet.</p>
            <p className="text-sm text-slate-500 mt-1">Please check back soon for updates to our catalogue.</p>
          </div>
        )}
      </div>
    </section>
  );
}