import type { Product } from "@/lib/site-data";
import { ProductGrid } from "@/components/product-grid";

type RelatedProductsProps = {
  products: Product[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products.length) {
    return null;
  }

  return (
    <section aria-labelledby="related-products" className="section-space">
      <div className="page-container">
        <div className="max-w-2xl">
          <p className="eyebrow">Keep exploring</p>
          <h2 className="section-title mt-3" id="related-products">
            More from this category.
          </h2>
        </div>
        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
