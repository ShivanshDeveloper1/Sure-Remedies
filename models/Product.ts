import mongoose, { Schema } from "mongoose";

export type ProductStatus = "published" | "draft";

export type ProductDocument = {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  categoryId: mongoose.Types.ObjectId;
  image?: string;
  price?: number;
  priceLabel?: string;
  shortDescription?: string;
  description?: string;
  specifications: { label: string; value: string }[];
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
};

const specificationSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    image: { type: String, trim: true, default: "" },
    price: { type: Number, min: 0 },
    priceLabel: { type: String, trim: true, default: "" },
    shortDescription: { type: String, trim: true, default: "" }, // Made optional
    description: { type: String, trim: true, default: "" },      // Made optional
    specifications: { type: [specificationSchema], default: [] },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "draft",
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ slug: 1 }, { unique: true });

const ProductModel =
  mongoose.models.Product ??
  mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;