import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from './lib/models/Product';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI as string;

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('🌱 Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    const products = [
      { name: 'Wireless Headphones', slug: 'wireless-headphones', description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.', price: 199.99, category: 'Electronics', inventory: 45, }, { name: 'USB-C Cable', slug: 'usb-c-cable', description: 'Durable USB-C charging cable compatible with most devices.', price: 12.99, category: 'Accessories', inventory: 150, }, { name: 'Portable SSD 1TB', slug: 'portable-ssd-1tb', description: 'Fast portable solid-state drive with 1TB storage capacity.', price: 129.99, category: 'Storage', inventory: 30, }, { name: 'Mechanical Keyboard', slug: 'mechanical-keyboard', description: 'RGB mechanical keyboard with cherry mx switches for gaming and typing.', price: 149.99, category: 'Peripherals', inventory: 25, }, { name: 'Wireless Mouse', slug: 'wireless-mouse', description: 'Ergonomic wireless mouse with precision tracking.', price: 34.99, category: 'Peripherals', inventory: 5 }, { name: '4K Webcam', slug: '4k-webcam', description: '4K resolution webcam perfect for streaming and video calls.', price: 89.99, category: 'Electronics', inventory: 15, }, { name: 'Monitor Arm Stand', slug: 'monitor-arm-stand', description: 'Adjustable monitor arm stand for improved workspace ergonomics.', price: 59.99, category: 'Accessories', inventory: 40, }, { name: 'Laptop Stand', slug: 'laptop-stand', description: 'Aluminum laptop stand for better ventilation and viewing angle.', price: 44.99, category: 'Accessories', inventory: 2 }, { name: 'Power Bank 20000mAh', slug: 'power-bank-20000mah', description: 'High-capacity power bank with fast charging support.', price: 39.99, category: 'Electronics', inventory: 60, }, { name: 'HDMI 2.1 Cable', slug: 'hdmi-2.1-cable', description: 'High-speed HDMI 2.1 cable for 4K@120Hz and 8K@60Hz video.', price: 19.99, category: 'Cables', inventory: 100, },
  {
    name: 'Bluetooth Speaker',
    slug: 'bluetooth-speaker',
    description: 'Portable Bluetooth speaker with deep bass and waterproof design.',
    price: 59.99,
    category: 'Electronics',
    inventory: 50,
  },
  {
    name: 'Wireless Charging Pad',
    slug: 'wireless-charging-pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 24.99,
    category: 'Accessories',
    inventory: 80,
  },
  {
    name: 'External Hard Drive 2TB',
    slug: 'external-hard-drive-2tb',
    description: 'Reliable 2TB external HDD with USB 3.0 connectivity.',
    price: 89.99,
    category: 'Storage',
    inventory: 25,
  },
  {
    name: 'Gaming Mouse Pad RGB',
    slug: 'gaming-mouse-pad-rgb',
    description: 'Large mouse pad with RGB lighting and anti-slip base.',
    price: 29.99,
    category: 'Peripherals',
    inventory: 70,
  },
  {
    name: 'Mechanical Numpad',
    slug: 'mechanical-numpad',
    description: 'Standalone mechanical numpad with customizable RGB lighting.',
    price: 49.99,
    category: 'Peripherals',
    inventory: 30,
  },
  {
    name: 'Smart Plug',
    slug: 'smart-plug',
    description: 'WiFi smart plug compatible with Alexa and Google Home.',
    price: 19.99,
    category: 'Electronics',
    inventory: 90,
  },
  {
    name: 'Cable Organizer Box',
    slug: 'cable-organizer-box',
    description: 'Keep your cables and adapters neatly organized on your desk.',
    price: 14.99,
    category: 'Accessories',
    inventory: 120,
  },
  {
    name: 'Portable NVMe SSD 2TB',
    slug: 'portable-nvme-ssd-2tb',
    description: 'Ultra-fast portable NVMe SSD with 2TB capacity and USB-C connection.',
    price: 199.99,
    category: 'Storage',
    inventory: 20,
  },
  {
    name: 'USB-C Hub 6-in-1',
    slug: 'usb-c-hub-6-in-1',
    description: 'Expand your laptop with HDMI, USB 3.0, SD, and Ethernet ports.',
    price: 39.99,
    category: 'Accessories',
    inventory: 55,
  },
  {
    name: 'HD Webcam 1080p',
    slug: 'hd-webcam-1080p',
    description: 'Full HD webcam with autofocus and built-in microphone for video conferencing.',
    price: 49.99,
    category: 'Electronics',
    inventory: 35,
  },
];


    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} products`);

    console.log('🎉 Database seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
