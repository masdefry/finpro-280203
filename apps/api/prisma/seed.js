require('dotenv').config({ path: '.env.development' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Step 1: Remove CPU Products
  await prisma.product.deleteMany({
    where: {
      category: {
        name: 'CPU', // Remove products that belong to the 'CPU' category
      },
    },
  });

  // Seed Categories
  const categories = [
    { name: 'Headsets' },
    { name: 'Monitors' },
    { name: 'Gaming Chairs' },
    { name: 'Keyboards' },
    { name: 'Mouse' },
    { name: 'Consoles' }
  ];

  // Upsert the categories
  for (const categoryData of categories) {
    await prisma.category.upsert({
      where: { name: categoryData.name },
      update: {},  
      create: categoryData,
    });
  }

  // Find categories by name to use their IDs in products
  const headsets = await prisma.category.findUnique({ where: { name: 'Headsets' } });
  const monitors = await prisma.category.findUnique({ where: { name: 'Monitors' } });
  const gamingChairs = await prisma.category.findUnique({ where: { name: 'Gaming Chairs' } });
  const keyboards = await prisma.category.findUnique({ where: { name: 'Keyboards' } });
  const mouse = await prisma.category.findUnique({ where: { name: 'Mouse' } });
  const consoles = await prisma.category.findUnique({ where: { name: 'Consoles' } });

  // Now that categories are fetched, we can define the products array
  const products = [
    // Headsets
    {
      name: 'Razer BlackShark V2',
      description: 'High-performance esports gaming headset with advanced audio features.',
      price: 1499000,
      imageUrl: '/images/RazerBlacSharkV2.jpg',
      categoryId: headsets.id
    },
    {
      name: 'HyperX Cloud II',
      description: 'Comfortable headset with 7.1 surround sound for immersive gaming.',
      price: 1299000,
      imageUrl: '/images/HyperXCloudII.jpg',
      categoryId: headsets.id
    },
    {
      name: 'SteelSeries Arctis Pro',
      description: 'High-fidelity gaming audio with lossless wireless and premium build.',
      price: 2499000,
      imageUrl: '/images/SteelSeriesArctisPro.jpg',
      categoryId: headsets.id
    },
    {
      name: 'Corsair HS70 Wireless',
      description: 'Wireless gaming headset with 7.1 surround sound and long battery life.',
      price: 1799000,
      imageUrl: '/images/CorsairHS70Wireless.jpg',
      categoryId: headsets.id
    },
    {
      name: 'Logitech G733 Lightspeed',
      description: 'Wireless gaming headset with customizable lighting and high-end audio.',
      price: 1999000,
      imageUrl: '/images/LogitechG733Lightspeed.jpg',
      categoryId: headsets.id
    },

    // Monitors
    {
      name: 'Alienware 27-inch Gaming Monitor',
      description: '27-inch 144Hz QHD monitor for competitive gaming with smooth visuals.',
      price: 7999000,
      imageUrl: '/images/Alienware27-inchGamingMonitor.jpg',
      categoryId: monitors.id
    },
    {
      name: 'ASUS ROG Swift PG279Q',
      description: '27-inch gaming monitor with 165Hz refresh rate and G-Sync support.',
      price: 8999000,
      imageUrl: '/images/ASUSROGSwiftPG279Q.jpg',
      categoryId: monitors.id
    },
    {
      name: 'LG UltraGear 34GN850-B',
      description: '34-inch ultrawide gaming monitor with Nano IPS and G-Sync compatibility.',
      price: 12499000,
      imageUrl: '/images/LGUltraGear34GN850-B.jpg',
      categoryId: monitors.id
    },
    {
      name: 'Samsung Odyssey G7',
      description: '32-inch curved QHD gaming monitor with a 240Hz refresh rate.',
      price: 10999000,
      imageUrl: '/images/SamsungOdysseyG7.jpg',
      categoryId: monitors.id
    },
    {
      name: 'MSI Optix MAG272CQR',
      description: '27-inch curved gaming monitor with a 165Hz refresh rate.',
      price: 6999000,
      imageUrl: '/images/MSIOptixMAG272CQR.jpg',
      categoryId: monitors.id
    },

    // Gaming Chairs
    {
      name: 'Secretlab Titan',
      description: 'Ergonomically designed gaming chair with customizable features.',
      price: 5999000,
      imageUrl: '/images/SecretlabTitan.jpg',
      categoryId: gamingChairs.id
    },
    {
      name: 'DXRacer Formula Series',
      description: 'Popular gaming chair with a racing-inspired design.',
      price: 4999000,
      imageUrl: '/images/DXRacerFormulaSeries.jpg',
      categoryId: gamingChairs.id
    },
    {
      name: 'AKRacing Core Series EX',
      description: 'Durable and comfortable gaming chair for long gaming sessions.',
      price: 5499000,
      imageUrl: '/images/AKRacingCoreSeriesEX.jpg',
      categoryId: gamingChairs.id
    },
    {
      name: 'Noblechairs Hero',
      description: 'Premium gaming chair with advanced lumbar support for better ergonomics.',
      price: 6999000,
      imageUrl: '/images/NoblechairsHero.jpg',
      categoryId: gamingChairs.id
    },
    {
      name: 'Cougar Armor One',
      description: 'High-quality gaming chair with comfortable padding and adjustable armrests.',
      price: 3999000,
      imageUrl: '/images/CougarArmorOne.jpg',
      categoryId: gamingChairs.id
    },

    // Keyboards
    {
      name: 'Corsair K95 RGB Platinum',
      description: 'Mechanical gaming keyboard with customizable RGB lighting and macros.',
      price: 2999000,
      imageUrl: '/images/CorsairK95RGBPlatinum.jpg',
      categoryId: keyboards.id
    },
    {
      name: 'Razer Huntsman Elite',
      description: 'Opto-mechanical gaming keyboard with fast actuation and RGB lighting.',
      price: 3499000,
      imageUrl: '/images/RazerHuntsmanElite.jpg',
      categoryId: keyboards.id
    },
    {
      name: 'SteelSeries Apex Pro',
      description: 'Adjustable mechanical switches for personalized gaming performance.',
      price: 3499000,
      imageUrl: '/images/SteelSeriesApexPro.jpg',
      categoryId: keyboards.id
    },
    {
      name: 'Logitech G Pro X',
      description: 'Mechanical keyboard with customizable key switches and compact design.',
      price: 2999000,
      imageUrl: '/images/LogitechGProX.png',
      categoryId: keyboards.id
    },
    {
      name: 'HyperX Alloy FPS Pro',
      description: 'Compact, durable mechanical gaming keyboard with red switches.',
      price: 1999000,
      imageUrl: '/images/HyperXAlloyFPSPro.jpg',
      categoryId: keyboards.id
    },

    // Mouse
    {
      name: 'Logitech G Pro Wireless',
      description: 'Ultra-lightweight wireless gaming mouse designed for esports performance.',
      price: 2299000,
      imageUrl: '/images/LogitechGProWireless.jpg',
      categoryId: mouse.id
    },
    {
      name: 'Razer DeathAdder V2',
      description: 'Ergonomic gaming mouse with an ultra-fast optical sensor.',
      price: 1499000,
      imageUrl: '/images/RazerDeathAdderV2.png',
      categoryId: mouse.id
    },
    {
      name: 'SteelSeries Rival 600',
      description: 'Dual sensor system for precision and customizable weights.',
      price: 1999000,
      imageUrl: '/images/SteelSeriesRival600.jpg',
      categoryId: mouse.id
    },
    {
      name: 'Corsair Dark Core RGB',
      description: 'Wireless gaming mouse with customizable RGB lighting and side grips.',
      price: 2499000,
      imageUrl: '/images/CorsairDarkCoreRGB.jpg',
      categoryId: mouse.id
    },
    {
      name: 'Glorious Model O',
      description: 'Ultra-lightweight gaming mouse with honeycomb shell and RGB lighting.',
      price: 1899000,
      imageUrl: '/images/GloriousModelO.jpg',
      categoryId: mouse.id
    },

    // Consoles
    {
      name: 'PlayStation 5',
      description: 'Next-generation console with ultra-fast SSD and 4K gaming support.',
      price: 7999000,
      imageUrl: '/images/PlayStation5.jpg',
      categoryId: consoles.id
    },
    {
      name: 'Xbox Series X',
      description: 'Powerful next-gen gaming console with 4K resolution and 120Hz support.',
      price: 7499000,
      imageUrl: '/images/XboxSeriesX.jpg',
      categoryId: consoles.id
    },
    {
      name: 'Nintendo Switch',
      description: 'Hybrid console that can be used as a handheld or docked for TV gaming.',
      price: 3999000,
      imageUrl: '/images/NintendoSwitch.jpg',
      categoryId: consoles.id
    },
    {
      name: 'PlayStation 4 Pro',
      description: 'Upgraded version of PS4 with enhanced performance for 4K gaming.',
      price: 4999000,
      imageUrl: '/images/PlayStation4Pro.jpg',
      categoryId: consoles.id
    },
    {
      name: 'Xbox One X',
      description: 'High-performance console with native 4K gaming and HDR support.',
      price: 4999000,
      imageUrl: '/images/XboxOneX.jpg',
      categoryId: consoles.id
    }
  ];

  // Upsert the products (only update imageUrl)
  for (const productData of products) {
    await prisma.product.upsert({
      where: { name: productData.name },
      update: {
        imageUrl: productData.imageUrl  // Only update the imageUrl field
      },
      create: productData,
    });
  }

  console.log('Seed data updated!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
