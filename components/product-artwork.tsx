import Image from "next/image";
import type { Product } from "@/lib/site-data";

type ProductArtworkProps = {
  product: Product;
  className?: string;
  sizes?: string;
};

export function ProductArtwork({
  product,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ProductArtworkProps) {
  return (
    <div
      aria-label={`${product.name} product image`}
      className={`product-art theme-${product.theme} ${className}`}
      role="img"
    >
      {product.image ? (
        <Image
          alt={product.name}
          className="product-image"
          fill
          sizes={sizes}
          src={product.image}
          unoptimized
        />
      ) : (
        <div className="product-art-placeholder">
          <span className="product-placeholder-mark" aria-hidden="true">
            {product.initials}
          </span>
          <span className="product-placeholder-name">{product.name}</span>
          <span className="product-placeholder-note">Product image</span>
        </div>
      )}
    </div>
  );
}
