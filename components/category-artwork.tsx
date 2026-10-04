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
        <div className="category-art-placeholder">
          <span className="category-art-initials" aria-hidden="true">
            {category.initials}
          </span>
          <span className="category-art-name">{category.name}</span>
        </div>
      )}
    </div>
  );
}
