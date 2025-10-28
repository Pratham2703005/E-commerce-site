import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  lastUpdated: Date;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for this product'],
      trim: true,
      maxlength: [100, 'Product name cannot be more than 100 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Please provide a slug for this product'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description for this product'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price for this product'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category for this product'],
      trim: true,
    },
    inventory: {
      type: Number,
      required: [true, 'Please provide inventory count'],
      min: [0, 'Inventory cannot be negative'],
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
ProductSchema.index({ slug: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ createdAt: -1 });

export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
