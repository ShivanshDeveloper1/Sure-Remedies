import mongoose, { Schema } from "mongoose";

export type CategoryStatus = "active" | "inactive";

export type CategoryDocument = {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  status: CategoryStatus;
  createdAt: Date;
  updatedAt: Date;
};

const categorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    image: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" }, // Made optional
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
  },
  { timestamps: true }
);

categorySchema.index({ slug: 1 }, { unique: true });

const CategoryModel =
  mongoose.models.Category ??
  mongoose.model<CategoryDocument>("Category", categorySchema);

export default CategoryModel;