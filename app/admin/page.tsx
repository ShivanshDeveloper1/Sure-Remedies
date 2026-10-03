import type { Metadata } from "next";
import { AdminCatalog } from "@/components/admin-catalog";
import { getAdminCatalog } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Admin",
  description: "Manage the Sure Remedies categories and product catalogue.",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const catalog = await getAdminCatalog();

  return (
    <section className="bg-soft py-10 sm:py-14">
      <div className="page-container">
        <div className="mb-8">
          <p className="eyebrow">Catalogue workspace</p>
          <h1 className="section-title mt-3">Manage your products.</h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted">
            Add categories and products, update catalogue details, and control
            what is visible on the site.
          </p>
        </div>
        <AdminCatalog
          categories={catalog.categories}
          products={catalog.products}
        />
      </div>
    </section>
  );
}
