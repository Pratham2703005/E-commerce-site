import { connectDB } from '@/lib/mongodb';
import { Product } from '@/lib/models/Product';
import { verifyApiKey } from '@/lib/auth';
import { Types } from 'mongoose';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization');
    if (!verifyApiKey(authHeader ?? undefined)) {
      return Response.json(
        {
          success: false,
          error: 'Unauthorized - Invalid or missing API key',
        },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          error: 'Invalid product ID',
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, price, inventory, description, category } = body;

    // Validate data types if provided
    if (price !== undefined && (typeof price !== 'number' || price < 0)) {
      return Response.json(
        {
          success: false,
          error: 'Price must be a non-negative number',
        },
        { status: 400 }
      );
    }

    if (inventory !== undefined && (typeof inventory !== 'number' || inventory < 0)) {
      return Response.json(
        {
          success: false,
          error: 'Inventory must be a non-negative number',
        },
        { status: 400 }
      );
    }

    await connectDB();

    // Find and update product
    const updateData: Record<string, unknown> = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (price !== undefined) updateData.price = price;
    if (inventory !== undefined) updateData.inventory = inventory;
    updateData.lastUpdated = new Date();

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return Response.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: 'Product updated successfully',
        data: updatedProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating product:', error);
    return Response.json(
      {
        success: false,
        error: 'Failed to update product',
      },
      { status: 500 }
    );
  }
}
