import Link from "next/link";
import { getProductPriceLabel, type Product } from "@/lib/site-data";
import { ProductArtwork } from "@/components/product-artwork";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { Tag, Package } from "lucide-react";

type ProductDetailsProps = {
  product: Product;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  const priceLabel = getProductPriceLabel(product);

  return (
    <div>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
          <li>
            <Link
              className="transition-colors hover:text-forest"
              href="/"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-border">/</li>
          <li>
            <Link
              className="transition-colors hover:text-forest"
              href="/products"
            >
              Products
            </Link>
          </li>
          {product.category ? (
            <>
              <li aria-hidden="true" className="text-border">/</li>
              <li className="text-muted">{product.category}</li>
            </>
          ) : null}
          <li aria-hidden="true" className="text-border">/</li>
          <li aria-current="page" className="font-semibold text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Main grid */}
      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Image */}
        <ProductArtwork
          className="product-detail-art"
          product={product}
          sizes="(max-width: 1024px) 100vw, 55vw"
        />

        {/* Info panel */}
        <div className="pt-1 lg:py-6">
          {/* Category badge */}
          {product.category ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf/10 px-3 py-1 text-xs font-semibold text-leaf">
              <Tag size={11} />
              {product.category}
            </span>
          ) : null}

          <h1 className="mt-4 text-4xl font-bold leading-[1.06] tracking-[-0.065em] text-ink sm:text-5xl">
            {product.name}
          </h1>

          {priceLabel ? (
            <p className="mt-3 text-xl font-bold text-forest">{priceLabel}</p>
          ) : null}

          <div className="mt-1 h-px bg-border" />

          {product.description ? (
            <p className="mt-5 text-base leading-8 text-muted">
              {product.description}
            </p>
          ) : null}

          {/* Specifications */}
          {product.specifications.length ? (
            <section
              aria-labelledby="product-specifications"
              className="mt-7"
            >
              <h2
                className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-ink"
                id="product-specifications"
              >
                <Package size={14} className="text-leaf" />
                Specifications
              </h2>
              <dl className="divide-y divide-border rounded-xl border border-border bg-white overflow-hidden">
                {product.specifications.map((spec) => (
                  <div
                    className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-4 px-4 py-3 text-sm"
                    key={spec.label}
                  >
                    <dt className="font-semibold text-ink">{spec.label}</dt>
                    <dd className="text-right text-muted">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppLink
              className="button-primary"
              productName={product.name}
            >
              Enquire on WhatsApp <span aria-hidden="true">↗</span>
            </WhatsAppLink>
            <Link
              href="/products"
              className="button-outline"
            >
              ← Back to products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
