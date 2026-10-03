import { NextResponse } from "next/server";
import {
  createCategory,
  createProduct,
  CatalogError,
} from "@/lib/catalog";
import { catalogApiError, readRequestBody } from "@/lib/catalog-api";

type Resource = "categories" | "products";
type RouteContext = {
  params: Promise<{ resource: string }>;
};

function getResource(value: string): Resource {
  if (value === "categories" || value === "products") {
    return value;
  }
  throw new CatalogError("Catalog resource not found.", 404);
}

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const { resource: rawResource } = await params;
    const resource = getResource(rawResource);
    const body = await readRequestBody(request);
    const id =
      resource === "categories"
        ? await createCategory(body)
        : await createProduct(body);
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    return catalogApiError(error);
  }
}
