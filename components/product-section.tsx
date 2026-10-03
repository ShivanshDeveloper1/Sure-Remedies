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
  products,
  href,
  linkLabel,
}: ProductSectionProps) {
  return (
    <section className="section-space">
      <div className="page-container">
        <div className="section-heading">
          <div className="max-w-2xl">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="section-title mt-3">{title}</h2>
            <p className="mt-4 max-w-xl leading-7 text-muted">{description}</p>
          </div>
          {href && linkLabel ? (
            <Link className="text-link" href={href}>
              {linkLabel} <span aria-hidden="true">↗</span>
            </Link>
          ) : null}
        </div>
        {products.length ? (
          <div className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-9 rounded-2xl border border-ink/10 bg-white p-8 text-muted">
            There are no products to show just yet. Please check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
