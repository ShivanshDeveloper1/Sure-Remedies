import Image from "next/image";
import type { Category } from "@/lib/site-data";

type CategoryArtworkProps = {
  category: Category;
  className?: string;
};

export function CategoryArtwork({
  category,
  className = "",
}: CategoryArtworkProps) {
  return (
    <div
      aria-label={`${category.name} category`}
      className={`category-art theme-${category.theme} ${className}`}
      role="img"
    >
      {category.image ? (
        <Image
          alt=""
          className="category-image"
          fill
          sizes="(max-width: 768px) 100vw, 30vw"
          src={category.image}
          unoptimized
        />
      ) : (
        <>
          <span className="category-art-circle" />
          <span className="category-art-shape" />
          <span className="category-number" aria-hidden="true">
            {category.initials}
          </span>
        </>
      )}
    </div>
  );
}
