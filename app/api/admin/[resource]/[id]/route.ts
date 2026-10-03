import { NextResponse } from "next/server";
import {
  CatalogError,
  deleteCategory,
  deleteProduct,
  updateCategory,
  updateProduct,
} from "@/lib/catalog";
import { catalogApiError, readRequestBody } from "@/lib/catalog-api";

type Resource = "categories" | "products";
type RouteContext = {
  params: Promise<{ resource: string; id: string }>;
};

function getResource(value: string): Resource {
  if (value === "categories" || value === "products") {
    return value;
  }
  throw new CatalogError("Catalog resource not found.", 404);
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { resource: rawResource, id } = await params;
    const resource = getResource(rawResource);
    const body = await readRequestBody(request);
    const updatedId =
      resource === "categories"
        ? await updateCategory(id, body)
        : await updateProduct(id, body);
    return NextResponse.json({ id: updatedId });
  } catch (error) {
    return catalogApiError(error);
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { resource: rawResource, id } = await params;
    const resource = getResource(rawResource);
    if (resource === "categories") {
      await deleteCategory(id);
    } else {
      await deleteProduct(id);
    }
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return catalogApiError(error);
  }
}
