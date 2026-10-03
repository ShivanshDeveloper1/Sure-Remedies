import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

const maxFileSize = 10 * 1024 * 1024;
const allowedTypes = new Set([
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export async function POST(request: Request) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary environment variables are not configured." },
      { status: 503 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File) || !allowedTypes.has(file.type)) {
      return NextResponse.json(
        { error: "Select a supported image file." },
        { status: 400 },
      );
    }
    if (file.size === 0 || file.size > maxFileSize) {
      return NextResponse.json(
        { error: "Images must be smaller than 10 MB." },
        { status: 400 },
      );
    }

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const folder = "sure-remedies";
    const signature = createHash("sha1")
      .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
      .digest("hex");
    const uploadData = new FormData();
    uploadData.set("file", file, file.name);
    uploadData.set("api_key", apiKey);
    uploadData.set("folder", folder);
    uploadData.set("timestamp", timestamp);
    uploadData.set("signature", signature);

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/image/upload`,
      { method: "POST", body: uploadData },
    );
    if (!uploadResponse.ok) {
      return NextResponse.json(
        { error: "Cloudinary could not upload the image." },
        { status: 502 },
      );
    }

    const result = (await uploadResponse.json()) as { secure_url?: string };
    if (!result.secure_url) {
      return NextResponse.json(
        { error: "Cloudinary returned no image URL." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      url: result.secure_url.replace("/upload/", "/upload/f_auto,q_auto/"),
    });
  } catch {
    return NextResponse.json(
      { error: "The image upload could not be completed." },
      { status: 400 },
    );
  }
}