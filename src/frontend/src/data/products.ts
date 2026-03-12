export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  badge: string | null;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Casual T-Shirt",
    price: 499,
    originalPrice: 999,
    description:
      "Premium 100% cotton casual t-shirt, pre-shrunk and super soft. Available in S, M, L, XL sizes. Perfect for everyday wear.",
    image: "/assets/generated/product-tshirt.dim_400x400.jpg",
    rating: 4.3,
    reviews: 1247,
    badge: "Best Seller",
    category: "Fashion",
  },
  {
    id: 2,
    title: "Bluetooth Headphones",
    price: 1999,
    originalPrice: 3999,
    description:
      "Wireless Bluetooth 5.0 over-ear headphones with 20hr battery life, deep bass, and noise-isolation ear cushions.",
    image: "/assets/generated/product-headphones.dim_400x400.jpg",
    rating: 4.5,
    reviews: 3892,
    badge: "50% Off",
    category: "Electronics",
  },
  {
    id: 3,
    title: "Smart Watch",
    price: 3499,
    originalPrice: 5999,
    description:
      "Modern smartwatch with heart rate monitor, step counter, sleep tracking, and WhatsApp notifications. Water resistant IP67.",
    image: "/assets/generated/product-watch.dim_400x400.jpg",
    rating: 4.4,
    reviews: 2156,
    badge: "New Arrival",
    category: "Electronics",
  },
  {
    id: 4,
    title: "Running Shoes",
    price: 2299,
    originalPrice: 3499,
    description:
      "Lightweight breathable running shoes with responsive foam cushioning and anti-slip rubber outsole. Available sizes 6-11.",
    image: "/assets/generated/product-shoes.dim_400x400.jpg",
    rating: 4.6,
    reviews: 5431,
    badge: "Top Rated",
    category: "Sports",
  },
  {
    id: 5,
    title: "Leather Wallet",
    price: 699,
    originalPrice: 1299,
    description:
      "Slim genuine leather bifold wallet with 8 card slots, clear ID window, and RFID blocking protection.",
    image: "/assets/generated/product-wallet.dim_400x400.jpg",
    rating: 4.2,
    reviews: 876,
    badge: null,
    category: "Accessories",
  },
  {
    id: 6,
    title: "Travel Backpack",
    price: 1599,
    originalPrice: 2499,
    description:
      "35L durable water-resistant backpack with dedicated 15.6-inch laptop compartment, USB charging port, and ergonomic shoulder straps.",
    image: "/assets/generated/product-backpack.dim_400x400.jpg",
    rating: 4.4,
    reviews: 2087,
    badge: "Trending",
    category: "Bags",
  },
  {
    id: 7,
    title: "Wireless Earbuds",
    price: 1299,
    originalPrice: 2499,
    description:
      "True wireless earbuds with active noise cancellation, 6hr playtime + 24hr charging case, IPX5 waterproof, and instant pairing.",
    image: "/assets/generated/product-earbuds.dim_400x400.jpg",
    rating: 4.3,
    reviews: 1854,
    badge: "48% Off",
    category: "Electronics",
  },
  {
    id: 8,
    title: "Laptop Stand",
    price: 799,
    originalPrice: 1499,
    description:
      "Adjustable aluminum laptop stand with 6 height levels and foldable design. Compatible with all laptops 10-17 inch. Improves posture.",
    image: "/assets/generated/product-laptop-stand.dim_400x400.jpg",
    rating: 4.5,
    reviews: 934,
    badge: null,
    category: "Electronics",
  },
  {
    id: 9,
    title: "Yoga Mat",
    price: 599,
    originalPrice: 999,
    description:
      "6mm thick non-slip premium yoga mat with alignment lines, eco-friendly TPE material, and carrying strap included.",
    image: "/assets/generated/product-yoga-mat.dim_400x400.jpg",
    rating: 4.4,
    reviews: 2341,
    badge: "Eco Choice",
    category: "Sports",
  },
  {
    id: 10,
    title: "Cricket Bat",
    price: 1899,
    originalPrice: 2999,
    description:
      "Full size Grade-A English willow cricket bat with premium rubber grip, spring-handle design, and toe guard. Ideal for hard tennis ball.",
    image: "/assets/generated/product-cricket-bat.dim_400x400.jpg",
    rating: 4.6,
    reviews: 1128,
    badge: "Player's Choice",
    category: "Sports",
  },
  {
    id: 11,
    title: "Aviator Sunglasses",
    price: 499,
    originalPrice: 899,
    description:
      "Classic aviator sunglasses with UV400 protection, gold metal frame, polarized brown lenses. Unisex design with spring hinges.",
    image: "/assets/generated/product-sunglasses.dim_400x400.jpg",
    rating: 4.1,
    reviews: 673,
    badge: null,
    category: "Accessories",
  },
  {
    id: 12,
    title: "Formal Shirt",
    price: 899,
    originalPrice: 1799,
    description:
      "Premium cotton blend formal shirt with regular fit, full sleeves, and easy-care fabric. Perfect for office and formal occasions.",
    image: "/assets/generated/product-formal-shirt.dim_400x400.jpg",
    rating: 4.3,
    reviews: 987,
    badge: "Office Essential",
    category: "Fashion",
  },
];
