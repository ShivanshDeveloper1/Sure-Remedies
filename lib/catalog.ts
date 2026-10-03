import "server-only";
import mongoose from "mongoose";
import CategoryModel, {
  type CategoryDocument,
  type CategoryStatus,
} from "@/models/Category";
import ProductModel, {
  type ProductDocument,
  type ProductStatus,
} from "@/models/Product";
import { connectToDatabase } from "@/lib/mongodb";
import type { Category, Product, Specification } from "@/lib/site-data";

export class CatalogError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "CatalogError";
  }
}

type CategoryInput = {
  name: string;
  description: string;
  image: string;
  status: CategoryStatus;
};

type ProductInput = {
  name: string;
  categoryId: string;
  image: string;
  price?: number;
  priceLabel: string;
  shortDescription: string;
  description: string;
  specifications: Specification[];
  status: ProductStatus;
};

type CatalogDocuments = {
  categories: CategoryDocument[];
  products: ProductDocument[];
};

const themes: Category["theme"][] = ["sage", "lilac", "sand"];

function makeSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function mapCategory(document: CategoryDocument, index: number): Category {
  return {
    id: document._id.toString(),
    name: document.name,
    slug: document.slug,
    description: document.description ?? "",
    image: document.image ?? "",
    status: document.status,
    theme: themes[index % themes.length],
    initials: String(index + 1).padStart(2, "0"),
  };
}

function mapProduct(
  document: ProductDocument,
  category: Category,
): Product {
  return {
    id: document._id.toString(),
    name: document.name,
    slug: document.slug,
    category: category.name,
    categoryId: category.id,
    categorySlug: category.slug,
    image: document.image ?? "",
    ...(document.price === undefined ? {} : { price: document.price }),
    ...(document.priceLabel ? { priceLabel: document.priceLabel } : {}),
    shortDescription: document.shortDescription ?? "",
    description: document.description ?? "",
    specifications: document.specifications.map(({ label, value }) => ({
      label,
      value,
    })),
    theme: category.theme,
    initials:
      document.name
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("") || "P",
    status: document.status,
  };
}

function mapCatalogDocuments(
  categoryDocuments: CategoryDocument[],
  productDocuments: ProductDocument[],
): { categories: Category[]; products: Product[] } {
  const mappedCategories = categoryDocuments.map(mapCategory);
  const categoriesById = new Map(
    mappedCategories.map((category) => [category.id, category]),
  );
  const products = productDocuments.flatMap((document) => {
    const category = categoriesById.get(document.categoryId.toString());
    return category ? [mapProduct(document, category)] : [];
  });

  return { categories: mappedCategories, products };
}

async function loadCatalogDocuments(activeOnly: boolean): Promise<CatalogDocuments> {
  await connectToDatabase();
  const categoryFilter = activeOnly ? { status: "active" } : {};
  const categories = await CategoryModel.find(categoryFilter)
    .sort({ name: 1 })
    .lean<CategoryDocument[]>();
  const categoryIds = categories.map((category) => category._id);
  const productFilter = activeOnly
    ? { status: "published", categoryId: { $in: categoryIds } }
    : {};
  const products = await ProductModel.find(productFilter)
    .sort({ createdAt: -1 })
    .lean<ProductDocument[]>();

  return { categories, products };
}

export async function getPublicCatalog() {
  const { categories, products } = await loadCatalogDocuments(true);
  return mapCatalogDocuments(categories, products);
}

export async function getAdminCatalog() {
  const { categories, products } = await loadCatalogDocuments(false);
  return mapCatalogDocuments(categories, products);
}

export async function getPublicProduct(slug: string) {
  await connectToDatabase();
  const document = await ProductModel.findOne({ slug, status: "published" })
    .lean<ProductDocument>();

  if (!document) {
    return null;
  }

  const categoryDocuments = await CategoryModel.find({ status: "active" })
    .sort({ name: 1 })
    .lean<CategoryDocument[]>();
  const categoryIndex = categoryDocuments.findIndex(
    (item) => item._id.toString() === document.categoryId.toString(),
  );
  if (categoryIndex < 0) {
    return null;
  }

  const category = mapCategory(categoryDocuments[categoryIndex], categoryIndex);
  return {
    category,
    product: mapProduct(document, category),
  };
}

export async function getRelatedProducts(categoryId: string, productId: string) {
  await connectToDatabase();
  const categoryDocuments = await CategoryModel.find({ status: "active" })
    .sort({ name: 1 })
    .lean<CategoryDocument[]>();
  const categoryIndex = categoryDocuments.findIndex(
    (category) => category._id.toString() === categoryId,
  );
  if (categoryIndex < 0) {
    return [];
  }

  const productDocuments = await ProductModel.find({
    categoryId,
    status: "published",
    _id: { $ne: productId },
  })
    .sort({ createdAt: -1 })
    .lean<ProductDocument[]>();
  const category = mapCategory(categoryDocuments[categoryIndex], categoryIndex);
  return productDocuments.map((document) => mapProduct(document, category));
}

function readString(
  value: unknown,
  field: string,
  required = false,
): string {
  if (typeof value !== "string") {
    if (value === undefined || value === null) {
      if (required) {
        throw new CatalogError(`${field} is required.`, 400);
      }
      return "";
    }
    throw new CatalogError(`${field} must be text.`, 400);
  }

  const trimmed = value.trim();
  if (required && !trimmed) {
    throw new CatalogError(`${field} is required.`, 400);
  }
  return trimmed;
}

function readCategoryInput(value: unknown): CategoryInput {
  if (!value || typeof value !== "object") {
    throw new CatalogError("Category details are required.", 400);
  }

  const input = value as Record<string, unknown>;
  const status = input.status ?? "active";
  if (status !== "active" && status !== "inactive") {
    throw new CatalogError("Category status must be active or inactive.", 400);
  }

  return {
    name: readString(input.name, "Category name", true),
    description: readString(input.description, "Category description"),
    image: readString(input.image, "Category image"),
    status,
  };
}

function readProductInput(value: unknown): ProductInput {
  if (!value || typeof value !== "object") {
    throw new CatalogError("Product details are required.", 400);
  }

  const input = value as Record<string, unknown>;
  const status = input.status ?? "draft";
  if (status !== "published" && status !== "draft") {
    throw new CatalogError("Product status must be published or draft.", 400);
  }

  const rawPrice = input.price;
  const price =
    rawPrice === undefined || rawPrice === null || rawPrice === ""
      ? undefined
      : Number(rawPrice);
  if (price !== undefined && (!Number.isFinite(price) || price < 0)) {
    throw new CatalogError("Price must be a non-negative number.", 400);
  }

  if (
    input.specifications !== undefined &&
    input.specifications !== null &&
    !Array.isArray(input.specifications)
  ) {
    throw new CatalogError("Specifications must be a list.", 400);
  }

  const specifications = (input.specifications ?? []).map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new CatalogError(`Specification ${index + 1} is invalid.`, 400);
    }
    const specification = item as Record<string, unknown>;
    return {
      label: readString(specification.label, `Specification ${index + 1} label`, true),
      value: readString(specification.value, `Specification ${index + 1} value`, true),
    };
  });

  if (!mongoose.isValidObjectId(input.categoryId)) {
    throw new CatalogError("Select a valid category.", 400);
  }

  return {
    name: readString(input.name, "Product name", true),
    categoryId: String(input.categoryId),
    image: readString(input.image, "Product image"),
    ...(price === undefined ? {} : { price }),
    priceLabel: readString(input.priceLabel, "Price label"),
    shortDescription: readString(input.shortDescription, "Short description"),
    description: readString(input.description, "Description"),
    specifications,
    status,
  };
}

async function ensureCategoryExists(categoryId: string) {
  const category = await CategoryModel.findById(categoryId)
    .lean<CategoryDocument>();
  if (!category) {
    throw new CatalogError("The selected category does not exist.", 400);
  }
}

function throwIfDuplicateSlug(error: unknown): never {
  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === 11000
  ) {
    throw new CatalogError("That name is already in use.", 409);
  }
  throw error;
}

export async function createCategory(value: unknown) {
  await connectToDatabase();
  const input = readCategoryInput(value);
  const slug = makeSlug(input.name);
  if (!slug) {
    throw new CatalogError("Category name must include letters or numbers.", 400);
  }

  try {
    const document = await CategoryModel.create({ ...input, slug });
    return document._id.toString();
  } catch (error) {
    throwIfDuplicateSlug(error);
  }
}

export async function updateCategory(id: string, value: unknown) {
  await connectToDatabase();
  if (!mongoose.isValidObjectId(id)) {
    throw new CatalogError("Category not found.", 404);
  }
  const input = readCategoryInput(value);
  const slug = makeSlug(input.name);
  if (!slug) {
    throw new CatalogError("Category name must include letters or numbers.", 400);
  }

  try {
    const document = await CategoryModel.findByIdAndUpdate(
      id,
      { ...input, slug },
      { new: true, runValidators: true },
    );
    if (!document) {
      throw new CatalogError("Category not found.", 404);
    }
    return document._id.toString();
  } catch (error) {
    throwIfDuplicateSlug(error);
  }
}

export async function deleteCategory(id: string) {
  await connectToDatabase();
  if (!mongoose.isValidObjectId(id)) {
    throw new CatalogError("Category not found.", 404);
  }
  if (await ProductModel.exists({ categoryId: id })) {
    throw new CatalogError(
      "Move or delete this category's products before deleting the category.",
      409,
    );
  }
  const deleted = await CategoryModel.findByIdAndDelete(id);
  if (!deleted) {
    throw new CatalogError("Category not found.", 404);
  }
}

export async function createProduct(value: unknown) {
  await connectToDatabase();
  const input = readProductInput(value);
  await ensureCategoryExists(input.categoryId);
  const slug = makeSlug(input.name);
  if (!slug) {
    throw new CatalogError("Product name must include letters or numbers.", 400);
  }

  try {
    const document = await ProductModel.create({ ...input, slug });
    return document._id.toString();
  } catch (error) {
    throwIfDuplicateSlug(error);
  }
}

export async function updateProduct(id: string, value: unknown) {
  await connectToDatabase();
  if (!mongoose.isValidObjectId(id)) {
    throw new CatalogError("Product not found.", 404);
  }
  const input = readProductInput(value);
  await ensureCategoryExists(input.categoryId);
  const slug = makeSlug(input.name);
  if (!slug) {
    throw new CatalogError("Product name must include letters or numbers.", 400);
  }

  try {
    const document = await ProductModel.findByIdAndUpdate(
      id,
      {
        $set: { ...input, slug },
        ...(input.price === undefined ? { $unset: { price: 1 } } : {}),
      },
      { new: true, runValidators: true },
    );
    if (!document) {
      throw new CatalogError("Product not found.", 404);
    }
    return document._id.toString();
  } catch (error) {
    throwIfDuplicateSlug(error);
  }
}

export async function deleteProduct(id: string) {
  await connectToDatabase();
  if (!mongoose.isValidObjectId(id)) {
    throw new CatalogError("Product not found.", 404);
  }
  const deleted = await ProductModel.findByIdAndDelete(id);
  if (!deleted) {
    throw new CatalogError("Product not found.", 404);
  }
}
