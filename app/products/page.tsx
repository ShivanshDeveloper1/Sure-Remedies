import type { Metadata } from "next";
import { ProductGrid } from "@/components/product-grid";
import { getPublicCatalog } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore animal feed supplements and nutrition products from Boonvet Formulations.",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const { products } = await getPublicCatalog();

  return (
    <>
      <section className="products-intro bg-ink py-14 text-white sm:py-20">
        <div className="page-container">
          <p className="eyebrow text-mint">
            Boonvet Formulations · Product catalogue
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.03] tracking-[-0.065em] sm:text-6xl lg:text-7xl">
            Animal nutrition
            <br />
            <span className="text-mint">products and supplements.</span>
          </h1>
          <p className="mt-5 max-w-xl leading-7 text-white/65">
            Browse our current range. Product details and availability can be
            discussed directly with our team.
          </p>
        </div>
      </section>

      <section className="bg-soft py-10 sm:py-14">
        <div className="page-container">
          <ProductGrid products={products} />
        </div>
      </section>
    </>
  );
}
