import { connectDB } from '@/lib/mongodb';

/**
 * Initialize database connection when the server starts
 * This ensures MongoDB is connected and ready before any requests are processed
 */
async function initializeDatabase() {
  try {
    console.log('🔗 Initializing database connection...');
    await connectDB();
    console.log('✅ Database connected successfully on server startup');
    return true;
  } catch (error) {
    console.error('❌ Failed to connect to database on startup:', error);
    process.exit(1); // Exit if database connection fails
  }
}

// Initialize database on module load
initializeDatabase();
