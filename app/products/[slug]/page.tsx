import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/product-details";
import { RelatedProducts } from "@/components/related-products";
import { getPublicProduct, getRelatedProducts } from "@/lib/catalog";

type ProductDetailProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ProductDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPublicProduct(slug);

  if (!result) {
    return { title: "Product not found" };
  }

  return {
    title: result.product.name,
    description: result.product.shortDescription,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailProps) {
  const { slug } = await params;
  const result = await getPublicProduct(slug);
  if (!result) {
    notFound();
  }

  const { product } = result;
  const relatedProducts = await getRelatedProducts(product.id);

  return (
    <>
      <section className="bg-hero py-10 sm:py-14">
        <div className="page-container">
          <ProductDetails product={product} />
        </div>
      </section>
      <RelatedProducts products={relatedProducts} />
    </>
  );
}
