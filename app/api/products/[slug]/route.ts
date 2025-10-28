import { connectDB } from '@/lib/mongodb';
import { Product } from '@/lib/models/Product';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    if (!slug) {
      return Response.json(
        {
          success: false,
          error: 'Slug is required',
        },
        { status: 400 }
      );
    }

    await connectDB();
    const product = await Product.findOne({ slug });

    if (!product) {
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
        data: product,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return Response.json(
      {
        success: false,
        error: 'Failed to fetch product',
      },
      { status: 500 }
    );
  }
}
