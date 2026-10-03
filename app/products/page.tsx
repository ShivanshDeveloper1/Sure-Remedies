import type { Metadata } from "next";
import Link from "next/link";
import { CategorySection } from "@/components/category-section";
import { getPublicCatalog } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore the thoughtfully selected Sure Remedies product collection by category.",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const { categories, products } = await getPublicCatalog();

  return (
    <>
      <section className="products-intro bg-ink py-14 text-white sm:py-20">
        <div className="page-container grid gap-9 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow text-mint">The Sure Remedies</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.03] tracking-[-0.065em] sm:text-6xl lg:text-7xl">
              Find something
              <br />
              <span className="text-mint">good for every day.</span>
            </h1>
            <p className="mt-5 max-w-xl leading-7 text-white/65">
              Browse thoughtfully selected essentials by category. Each one is
              chosen to bring a little more ease to the everyday.
            </p>
          </div>
          <nav aria-label="Product categories" className="lg:justify-self-end">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              Browse a category
            </p>
            <ul className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    className="inline-flex min-h-10 items-center rounded-full border border-white/20 px-4 text-sm text-white/80 transition-colors hover:border-mint hover:bg-mint hover:text-ink"
                    href={`#category-${category.slug}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <div className="bg-soft py-10 sm:py-14">
        <div className="page-container space-y-8">
          {categories.map((category, index) => (
            <CategorySection
              category={category}
              index={index}
              key={category.slug}
              products={products.filter(
                (product) => product.categorySlug === category.slug,
              )}
            />
          ))}
        </div>
      </div>
    </>
  );
}
