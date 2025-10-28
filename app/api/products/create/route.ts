import { connectDB } from '@/lib/mongodb';
import { Product } from '@/lib/models/Product';
import { verifyApiKey } from '@/lib/auth';

export async function POST(request: Request) {
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

    const body = await request.json();
    const { name, slug, description, price, category, inventory } = body;

    // Validate required fields
    if (!name || !slug || !description || price === undefined || !category || inventory === undefined) {
      return Response.json(
        {
          success: false,
          error: 'Missing required fields: name, slug, description, price, category, inventory',
        },
        { status: 400 }
      );
    }

    // Validate data types
    if (typeof price !== 'number' || price < 0) {
      return Response.json(
        {
          success: false,
          error: 'Price must be a non-negative number',
        },
        { status: 400 }
      );
    }

    if (typeof inventory !== 'number' || inventory < 0) {
      return Response.json(
        {
          success: false,
          error: 'Inventory must be a non-negative number',
        },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if slug already exists
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return Response.json(
        {
          success: false,
          error: 'Product with this slug already exists',
        },
        { status: 409 }
      );
    }

    // Create new product
    const newProduct = await Product.create({
      name,
      slug,
      description,
      price,
      category,
      inventory,
      lastUpdated: new Date(),
    });

    return Response.json(
      {
        success: true,
        message: 'Product created successfully',
        data: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return Response.json(
      {
        success: false,
        error: 'Failed to create product',
      },
      { status: 500 }
    );
  }
}
