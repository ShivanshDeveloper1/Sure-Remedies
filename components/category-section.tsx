import Link from "next/link";
import type { Category, Product } from "@/lib/site-data";
import { CategoryArtwork } from "@/components/category-artwork";
import { ProductGrid } from "@/components/product-grid";

type CategorySectionProps = {
  category: Category;
  products: Product[];
  index: number;
};

export function CategorySection({
  category,
  products,
  index,
}: CategorySectionProps) {
  const productAnchor = `category-products-${category.slug}`;

  return (
    <section
      aria-labelledby={`category-${category.slug}-title`}
      className="category-section"
      id={`category-${category.slug}`}
    >
      <div className="category-section-heading">
        <CategoryArtwork
          category={category}
          className="category-section-art"
        />
        <div className="min-w-0 flex-1">
          <p className="eyebrow">Collection {String(index + 1).padStart(2, "0")}</p>
          <h2
            className="mt-2 text-2xl font-semibold tracking-[-0.045em] text-ink sm:text-3xl"
            id={`category-${category.slug}-title`}
          >
            {category.name}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted sm:text-base">
            {category.description}
          </p>
        </div>
        <Link
          className="text-link shrink-0"
          href={`#${productAnchor}`}
          aria-label={`View products in ${category.name}`}
        >
          View products <span aria-hidden="true">↓</span>
        </Link>
      </div>
      <ProductGrid id={productAnchor} products={products} />
    </section>
  );
}
