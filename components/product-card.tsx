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
    <article className="product-card group flex flex-col">
      {/* Image area */}
      <Link
        aria-label={`View ${product.name}`}
        className="relative block flex-shrink-0"
        href={`/products/${product.slug}`}
        tabIndex={-1}
      >
        <ProductArtwork
          className="product-card-art"
          product={product}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <span className="product-arrow" aria-hidden="true">↗</span>
      </Link>

      {/* Content area */}
      <div className="flex flex-1 flex-col px-4 pb-5 pt-4">
        {/* Category badge */}
        {product.category ? (
          <span className="mb-2 inline-block w-fit rounded-full bg-leaf/10 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-leaf">
            {product.category}
          </span>
        ) : null}

        {/* Name and price row */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 text-base font-semibold leading-snug tracking-tight text-ink">
            <Link
              className="transition-colors hover:text-forest"
              href={`/products/${product.slug}`}
            >
              {product.name}
            </Link>
          </h3>
          {priceLabel ? (
            <span className="shrink-0 pt-0.5 text-sm font-bold text-forest">
              {priceLabel}
            </span>
          ) : null}
        </div>

        {/* Short description */}
        <p className="mt-2 flex-1 text-sm leading-6 text-muted line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex min-h-9 items-center rounded-full bg-forest/8 px-4 text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-white"
          >
            View details
          </Link>
          <WhatsAppLink
            className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full border border-emerald-300/50 px-4 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
            productName={product.name}
          >
            Enquire <span aria-hidden="true">↗</span>
          </WhatsAppLink>
        </div>
      </div>
    </article>
  );
}
