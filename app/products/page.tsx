import type { Metadata } from "next";
import { ProductGrid } from "@/components/product-grid";
import { getPublicCatalog } from "@/lib/catalog";
import { PageIntro } from "@/components/page-intro";

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
      <PageIntro
        eyebrow="Boonvet Formulations · Product catalogue"
        title={
          <>
            Animal nutrition
            <br />
            <span style={{ color: "var(--forest)" }}>
              products and supplements.
            </span>
          </>
        }
        description="Browse our current range. Product details and availability can be discussed directly with our team."
      />

      <section
        className="py-10 sm:py-14"
        style={{ background: "var(--ivory)" }}
      >
        <div className="page-container">
          <ProductGrid products={products} />
        </div>
      </section>
    </>
  );
}
