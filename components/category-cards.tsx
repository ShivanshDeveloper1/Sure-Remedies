import Link from "next/link";
import type { Category } from "@/lib/site-data";
import { CategoryArtwork } from "@/components/category-artwork";

type CategoryCardsProps = {
  categories: Category[];
};

export function CategoryCards({ categories }: CategoryCardsProps) {
  return (
    <div className="mt-9 grid gap-5 md:grid-cols-3">
      {categories.map((category) => (
        <Link
          className={`category-card theme-${category.theme} group`}
          href={`/products#category-${category.slug}`}
          key={category.slug}
        >
          <CategoryArtwork category={category} />
          <div className="flex items-end justify-between gap-4 p-6">
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-ink">
                {category.name}
              </h3>
              <p className="mt-2 max-w-[17rem] text-sm leading-6 text-muted">
                {category.description}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="grid size-10 shrink-0 place-items-center rounded-full border border-ink/10 text-lg text-ink transition-all group-hover:border-purple group-hover:bg-purple group-hover:text-white"
            >
              ↗
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
