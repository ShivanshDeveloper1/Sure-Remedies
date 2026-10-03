import Link from "next/link";
import {
  getProductPriceLabel,
  type Category,
  type Product,
} from "@/lib/site-data";
import { ProductArtwork } from "@/components/product-artwork";
import { WhatsAppLink } from "@/components/whatsapp-link";

type ProductDetailsProps = {
  category: Category;
  product: Product;
};

export function ProductDetails({ category, product }: ProductDetailsProps) {
  const priceLabel = getProductPriceLabel(product);

  return (
    <div>
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link className="transition-colors hover:text-purple" href="/">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link className="transition-colors hover:text-purple" href="/products">
              Products
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              className="transition-colors hover:text-purple"
              href={`/products#category-${category.slug}`}
            >
              {category.name}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid items-start gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <ProductArtwork
          className="product-detail-art"
          product={product}
          sizes="(max-width: 1024px) 100vw, 55vw"
        />

        <div className="pt-1 lg:py-5">
          <p className="eyebrow">{category.name}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.065em] text-ink sm:text-5xl">
            {product.name}
          </h1>
          {priceLabel ? (
            <p className="mt-4 text-lg font-semibold text-purple">
              {priceLabel}
            </p>
          ) : null}
          <p className="mt-6 text-lg leading-8 text-muted">
            {product.description}
          </p>

          {product.specifications.length ? (
            <section aria-labelledby="product-specifications" className="mt-8">
              <h2
                className="text-sm font-semibold uppercase tracking-[0.12em] text-ink"
                id="product-specifications"
              >
                Specifications
              </h2>
              <dl className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                {product.specifications.map((specification) => (
                  <div
                    className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-4 py-3.5 text-sm"
                    key={specification.label}
                  >
                    <dt className="font-medium text-ink">
                      {specification.label}
                    </dt>
                    <dd className="text-right text-muted">
                      {specification.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          <WhatsAppLink
            className="button-primary mt-8"
            productName={product.name}
          >
            Enquire on WhatsApp <span aria-hidden="true">↗</span>
          </WhatsAppLink>
        </div>
      </div>
    </div>
  );
}
