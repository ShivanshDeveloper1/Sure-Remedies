import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { CatalogError } from "@/lib/catalog";

export function catalogApiError(error: unknown) {
  if (error instanceof CatalogError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  console.error("Catalog API request failed:", error);
  return NextResponse.json(
    { error: "The catalog request could not be completed." },
    { status: 500 },
  );
}

export async function readRequestBody(request: Request) {
  try {
    return await request.json();
  } catch {
    throw new CatalogError("Request body must be valid JSON.", 400);
  }
}
