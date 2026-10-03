"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { Category, Product, Specification } from "@/lib/site-data";

type AdminCatalogProps = {
  categories: Category[];
  products: Product[];
};

type CategoryForm = {
  name: string;
  description: string;
  image: string;
  status: Category["status"];
};

type ProductForm = {
  name: string;
  categoryId: string;
  image: string;
  price: string;
  priceLabel: string;
  shortDescription: string;
  description: string;
  specificationsText: string;
  status: Product["status"];
};

const emptyCategory: CategoryForm = {
  name: "",
  description: "",
  image: "",
  status: "active",
};

function productForm(product?: Product): ProductForm {
  return {
    name: product?.name ?? "",
    categoryId: product?.categoryId ?? "",
    image: product?.image ?? "",
    price: product?.price != null ? product.price.toString() : "",
    priceLabel: product?.priceLabel ?? "",
    shortDescription: product?.shortDescription ?? "",
    description: product?.description ?? "",
    specificationsText:
      product?.specifications
        ?.map(({ label, value }) => `${label}: ${value}`)
        ?.join("\n") ?? "",
    status: product?.status ?? "draft",
  };
}

const inputClass =
  "mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/15";
const labelClass = "block text-sm font-medium text-ink";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className={labelClass}>
      {label}
      {children}
    </label>
  );
}

function ImageField({
  value,
  onChange,
  id,
}: {
  value: string;
  onChange: (value: string) => void;
  id: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function uploadImage(file: File | undefined) {
    if (!file) return;

    setUploading(true);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.set("file", file);
      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as {
        url?: string;
        error?: string;
      };
      if (!response.ok || !result.url) {
        throw new Error(result.error ?? "The image could not be uploaded.");
      }
      onChange(result.url);
    } catch (caught) {
      setUploadError(
        caught instanceof Error
          ? caught.message
          : "The image could not be uploaded."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className={labelClass} htmlFor={id}>
        Image <span className="text-xs text-muted">(Optional)</span>
      </label>
      <input
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        className={inputClass}
        id={id}
        onChange={(event) => void uploadImage(event.target.files?.[0])}
        type="file"
        disabled={uploading}
      />
      <p className="mt-1 text-xs text-muted">
        {uploading
          ? "Uploading image..."
          : value
          ? "Image uploaded. Select another file to replace it."
          : "Select an image file to upload (Optional)."}
      </p>
      {uploadError ? (
        <p className="mt-1 text-xs text-red-700">{uploadError}</p>
      ) : null}
    </div>
  );
}

async function request(
  resource: "categories" | "products",
  method: "POST" | "PUT" | "DELETE",
  id?: string,
  body?: object
) {
  const url = `/api/admin/${resource}${id ? `/${id}` : ""}`;

  console.log("🚀 API REQUEST START");
  console.log("URL:", url);
  console.log("Method:", method);
  console.log("Body:", body);

  try {
    const response = await fetch(url, {
      method,
      ...(body
        ? {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        : {}),
    });

    console.log("📡 API RESPONSE");
    console.log("Status:", response.status);
    console.log("OK:", response.ok);

    const responseText = await response.text();

    console.log("📦 Raw API response:", responseText);

    let result: { error?: string } = {};

    try {
      result = responseText
        ? (JSON.parse(responseText) as { error?: string })
        : {};
    } catch (parseError) {
      console.error("❌ Could not parse API response:", parseError);
    }

    if (!response.ok) {
      console.error("❌ API REQUEST FAILED");
      console.error("Status:", response.status);
      console.error("Error:", result.error);

      throw new Error(
        result.error ?? `Request failed with status ${response.status}`
      );
    }

    console.log("✅ API REQUEST SUCCESS");

  } catch (error) {
    console.error("🔥 REQUEST FUNCTION ERROR:", error);
    throw error;
  }
}

function parseSpecifications(value: string): Specification[] {
  if (!value?.trim()) return [];

  const normalized = value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();

  const result: Specification[] = [];

  const add = (label: string, itemValue: string) => {
    const cleanLabel = label.trim();
    const cleanValue = itemValue.trim();

    if (cleanLabel && cleanValue) {
      result.push({
        label: cleanLabel,
        value: cleanValue,
      });
    }
  };

  for (const rawLine of normalized.split("\n")) {
    const line = rawLine.trim();

    if (!line) continue;

    // 1. Name: Value
    const colonIndex = line.indexOf(":");

    if (colonIndex > 0) {
      add(
        line.slice(0, colonIndex),
        line.slice(colonIndex + 1)
      );
      continue;
    }

    // 2. Name | Value | Name | Value
    if (line.includes("|")) {
      const parts = line
        .split("|")
        .map((part) => part.trim())
        .filter(Boolean);

      for (let i = 0; i + 1 < parts.length; i += 2) {
        add(parts[i], parts[i + 1]);
      }

      continue;
    }

    // 3. Tab-separated Name / Value pairs
    if (line.includes("\t")) {
      const parts = line
        .split(/\t+/)
        .map((part) => part.trim())
        .filter(Boolean);

      for (let i = 0; i + 1 < parts.length; i += 2) {
        add(parts[i], parts[i + 1]);
      }

      continue;
    }

    // 4. Name - Value
    const dashMatch = line.match(/^(.+?)\s*[-–—]\s*(.+)$/);

    if (dashMatch) {
      add(dashMatch[1], dashMatch[2]);
      continue;
    }
  }

  return result;
}
export function AdminCatalog({
  categories,
  products,
}: AdminCatalogProps) {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [category, setCategory] = useState<CategoryForm>(emptyCategory);
  const [productId, setProductId] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductForm>(() => productForm());
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function resetCategory() {
    setCategoryId(null);
    setCategory(emptyCategory);
  }

  function resetProduct() {
    setProductId(null);
    setProduct(productForm());
  }

  async function perform(action: () => Promise<void>) {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await action();
      setMessage("Changes saved.");
      router.refresh();
      return true;
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "The request could not be completed."
      );
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function saveCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await perform(async () => {
      await request(
        "categories",
        categoryId ? "PUT" : "POST",
        categoryId ?? undefined,
        category
      );
      resetCategory();
    });
  }

  async function saveProduct(event: FormEvent<HTMLFormElement>) {
console.log("🔥 saveProduct() CALLED");

  event.preventDefault();

  console.log("✅ preventDefault() executed");
  console.log("Current product:", product);
  console.log("Current productId:", productId);
  console.log("Current busy:", busy);
  console.log("Current categories:", categories);
  await perform(async () => {
    // 1. Validate / parse specifications safely
    console.log("🔵 Specifications text:", product.specificationsText);

let specifications: Specification[];

try {
  specifications = parseSpecifications(product.specificationsText);

  console.log("✅ Specifications parsed:", specifications);
} catch (error) {
  console.error("❌ SPECIFICATIONS ERROR:", error);
  throw error;
}

console.log("🟣 PASSED INITIAL saveProduct LOGS");
    console.log("🟣 PASSED INITIAL saveProduct LOGS");

    // 2. Format price as number or null (never undefined)
    const formattedPrice =
      product.price.trim() !== "" && !isNaN(Number(product.price))
        ? Number(product.price)
        : null;

    await request(
      "products",
      productId ? "PUT" : "POST",
      productId ?? undefined,
      {
        name: product.name,
        categoryId: product.categoryId,
        image: product.image,
        price: formattedPrice,
        priceLabel: product.priceLabel,
        shortDescription: product.shortDescription,
        description: product.description,
        specifications,
        status: product.status,
      }
    );
    resetProduct();
  });
}

  async function remove(
    resource: "categories" | "products",
    id: string,
    name: string
  ) {
    if (!window.confirm(`Delete “${name}”?`)) {
      return;
    }
    const deleted = await perform(() => request(resource, "DELETE", id));
    if (deleted && resource === "categories" && categoryId === id) {
      resetCategory();
    }
    if (deleted && resource === "products" && productId === id) {
      resetProduct();
    }
  }

  return (
    <div className="space-y-8">
      <div aria-live="polite" className="min-h-5 text-sm">
        {error ? <p className="text-red-700">{error}</p> : null}
        {!error && message ? <p className="text-purple">{message}</p> : null}
      </div>

      {/* Category Section */}
      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <form className="admin-panel" onSubmit={saveCategory}>
          <div className="admin-panel-heading">
            <div>
              <p className="eyebrow">Categories</p>
              <h2 className="mt-2 text-xl font-semibold text-ink">
                {categoryId ? "Edit category" : "Create category"}
              </h2>
            </div>
            {categoryId ? (
              <button
                className="admin-secondary"
                onClick={resetCategory}
                type="button"
              >
                Cancel
              </button>
            ) : null}
          </div>
          <div className="mt-5 grid gap-4">
            <Field label="Name">
              <input
                className={inputClass}
                onChange={(event) =>
                  setCategory({ ...category, name: event.target.value })
                }
                required
                value={category.name}
              />
            </Field>
            <Field label="Short description (Optional)">
              <textarea
                className={`${inputClass} min-h-20`}
                onChange={(event) =>
                  setCategory({ ...category, description: event.target.value })
                }
                rows={3}
                value={category.description}
              />
            </Field>
            <ImageField
              id="category-image"
              onChange={(image) => setCategory({ ...category, image })}
              value={category.image}
            />
            <Field label="Status">
              <select
                className={inputClass}
                onChange={(event) =>
                  setCategory({
                    ...category,
                    status: event.target.value as Category["status"],
                  })
                }
                value={category.status}
              >
                <option value="active">Enabled</option>
                <option value="inactive">Disabled</option>
              </select>
            </Field>
            <button className="admin-primary" disabled={busy} type="submit">
              {busy
                ? "Saving..."
                : categoryId
                ? "Save category"
                : "Create category"}
            </button>
          </div>
        </form>

        <div className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <p className="eyebrow">Category list</p>
              <h2 className="mt-2 text-xl font-semibold text-ink">
                {categories.length}{" "}
                {categories.length === 1 ? "category" : "categories"}
              </h2>
            </div>
          </div>
          {categories.length ? (
            <ul className="mt-4 divide-y divide-ink/10">
              {categories.map((item) => (
                <li
                  className="flex flex-wrap items-center justify-between gap-3 py-4"
                  key={item.id}
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">{item.name}</p>
                    <p className="mt-1 text-xs text-muted">
                      {item.status === "active" ? "Enabled" : "Disabled"} ·{" "}
                      {item.slug}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="admin-secondary"
                      onClick={() => {
                        setCategoryId(item.id);
                        setCategory({
                          name: item.name,
                          description: item.description ?? "",
                          image: item.image ?? "",
                          status: item.status,
                        });
                      }}
                      type="button"
                    >
                      Edit
                    </button>
                    <button
                      className="admin-danger"
                      disabled={busy}
                      onClick={() =>
                        void remove("categories", item.id, item.name)
                      }
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm leading-6 text-muted">
              Create a category before adding products.
            </p>
          )}
        </div>
      </section>

      {/* Product Section */}
      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <form
  className="admin-panel"
  onSubmit={(event) => {
    console.log("🟡 FORM SUBMIT TRIGGERED");
    console.log("Form product state:", product);
    console.log("Form product ID:", productId);
    console.log("Form busy state:", busy);

    void saveProduct(event);
  }}
>
          <div className="admin-panel-heading">
            <div>
              <p className="eyebrow">Products</p>
              <h2 className="mt-2 text-xl font-semibold text-ink">
                {productId ? "Edit product" : "Create product"}
              </h2>
            </div>
            {productId ? (
              <button
                className="admin-secondary"
                onClick={resetProduct}
                type="button"
              >
                Cancel
              </button>
            ) : null}
          </div>
          {categories.length ? (
            <div className="mt-5 grid gap-4">
              <Field label="Name">
                <input
                  className={inputClass}
                  onChange={(event) =>
                    setProduct({ ...product, name: event.target.value })
                  }
                  required
                  value={product.name}
                />
              </Field>
              <Field label="Category">
                <select
                  className={inputClass}
                  onChange={(event) =>
                    setProduct({ ...product, categoryId: event.target.value })
                  }
                  required
                  value={product.categoryId}
                >
                  <option value="">Select a category</option>
                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                      {item.status === "inactive" ? " (disabled)" : ""}
                    </option>
                  ))}
                </select>
              </Field>
              <ImageField
                id="product-image"
                onChange={(image) => setProduct({ ...product, image })}
                value={product.image}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Price (Optional)">
                  <input
                    className={inputClass}
                    min="0"
                    onChange={(event) =>
                      setProduct({ ...product, price: event.target.value })
                    }
                    placeholder="Optional"
                    step="0.01"
                    type="number"
                    value={product.price}
                  />
                </Field>
                <Field label="Price label (Optional)">
                  <input
                    className={inputClass}
                    onChange={(event) =>
                      setProduct({
                        ...product,
                        priceLabel: event.target.value,
                      })
                    }
                    placeholder="e.g. Ask for details"
                    value={product.priceLabel}
                  />
                </Field>
              </div>
              <Field label="Short description (Optional)">
                <textarea
                  className={`${inputClass} min-h-20`}
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      shortDescription: event.target.value,
                    })
                  }
                  rows={3}
                  value={product.shortDescription}
                />
              </Field>
              <Field label="Description (Optional)">
                <textarea
                  className={`${inputClass} min-h-28`}
                  onChange={(event) =>
                    setProduct({ ...product, description: event.target.value })
                  }
                  rows={4}
                  value={product.description}
                />
              </Field>
              <Field label="Specifications (Optional, one per line: Name: Value)">
                <textarea
                  className={`${inputClass} min-h-28 font-mono text-xs`}
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      specificationsText: event.target.value,
                    })
                  }
                  placeholder={"Material: Cotton\nCare: Hand wash"}
                  rows={4}
                  value={product.specificationsText}
                />
              </Field>
              <Field label="Status">
                <select
                  className={inputClass}
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      status: event.target.value as Product["status"],
                    })
                  }
                  value={product.status}
                >
                  <option value="published">Published</option>
                  <option value="draft">Unpublished</option>
                </select>
              </Field>
            <button
  className="admin-primary"
  disabled={busy}
  type="submit"
  onClick={() => {
    console.log("🟢 CREATE PRODUCT BUTTON CLICKED");
    console.log("Product state:", product);
    console.log("Busy:", busy);
    console.log("Product ID:", productId);
    console.log("Categories:", categories);
  }}
>
  {busy
    ? "Saving..."
    : productId
    ? "Save product"
    : "Create product"}
</button>
            </div>
          ) : (
            <p className="mt-5 text-sm leading-6 text-muted">
              Create a category before adding products.
            </p>
          )}
        </form>

        <div className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <p className="eyebrow">Product list</p>
              <h2 className="mt-2 text-xl font-semibold text-ink">
                {products.length}{" "}
                {products.length === 1 ? "product" : "products"}
              </h2>
            </div>
          </div>
          {products.length ? (
            <ul className="mt-4 divide-y divide-ink/10">
              {products.map((item) => (
                <li
                  className="flex flex-wrap items-center justify-between gap-3 py-4"
                  key={item.id}
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">{item.name}</p>
                    <p className="mt-1 text-xs text-muted">
                      {item.category} ·{" "}
                      {item.status === "published" ? "Published" : "Unpublished"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="admin-secondary"
                      onClick={() => {
                        setProductId(item.id);
                        setProduct(productForm(item));
                      }}
                      type="button"
                    >
                      Edit
                    </button>
                    <button
                      className="admin-danger"
                      disabled={busy}
                      onClick={() =>
                        void remove("products", item.id, item.name)
                      }
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm leading-6 text-muted">
              No products yet. Create one using the form.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}