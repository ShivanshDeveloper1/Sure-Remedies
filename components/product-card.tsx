import Link from "next/link";
import { getProductPriceLabel, type Product } from "@/lib/site-data";
import { ProductArtwork } from "@/components/product-artwork";
import { WhatsAppLink } from "@/components/whatsapp-link";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const priceLabel = getProductPriceLabel(product);

  return (
    <article className="product-card group rounded-3xl border border-ink/5 bg-white p-3">
      <Link
        aria-label={`View ${product.name}`}
        className="relative block"
        href={`/products/${product.slug}`}
      >
        <ProductArtwork
          className="product-card-art"
          product={product}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <span className="product-arrow" aria-hidden="true">↗</span>
      </Link>
      <div className="px-2 pb-2 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
            {product.category}
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">
            <Link className="transition-colors hover:text-purple" href={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          </div>
          {priceLabel ? (
            <span className="shrink-0 pt-0.5 text-xs font-semibold text-ink">
              {priceLabel}
            </span>
          ) : null}
        </div>
        <p className="mt-1.5 min-h-12 text-sm leading-6 text-muted">
          {product.shortDescription}
        </p>
        <WhatsAppLink
          className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-purple/20 px-4 text-sm font-semibold text-purple transition-colors hover:bg-purple hover:text-white"
          productName={product.name}
        >
          Enquire on WhatsApp <span aria-hidden="true">↗</span>
        </WhatsAppLink>
      </div>
    </article>
  );
}
