import type { Product } from "@/lib/site-data";
import { ProductCard } from "@/components/product-card";

type ProductGridProps = {
  products: Product[];
  id?: string;
};

export function ProductGrid({ products, id }: ProductGridProps) {
  if (!products.length) {
    return (
      <p
        className="rounded-2xl border border-ink/10 bg-white p-7 text-sm leading-6 text-muted"
        id={id}
      >
        There are no products in this category yet. Please check back soon.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3" id={id}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
