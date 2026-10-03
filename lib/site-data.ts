export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  status: "active" | "inactive";
  theme: "sage" | "lilac" | "sand";
  initials: string;
};

export type Specification = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryId: string;
  categorySlug: string;
  image: string;
  price?: number;
  priceLabel?: string;
  shortDescription: string;
  description: string;
  specifications: Specification[];
  theme: "sage" | "lilac" | "sand";
  initials: string;
  status: "published" | "draft";
};

export function getProductPriceLabel(product: Product) {
  if (product.priceLabel) {
    return product.priceLabel;
  }

  if (product.price !== undefined) {
    return new Intl.NumberFormat("en-IN", {
      currency: "INR",
      maximumFractionDigits: 2,
      style: "currency",
    }).format(product.price);
  }

  return null;
}
