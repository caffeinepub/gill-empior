import { useCart } from "@/context/CartContext";
import { ShoppingCart, Star, Zap } from "lucide-react";
import type { Variants } from "motion/react";
import { motion } from "motion/react";
import { toast } from "sonner";

const products = [
  {
    id: 1,
    title: "Casual T-Shirt",
    price: 499,
    originalPrice: 999,
    description: "Premium cotton casual t-shirt, available in multiple sizes.",
    image: "/assets/generated/product-tshirt.dim_400x400.jpg",
    rating: 4.3,
    reviews: 1247,
    badge: "Best Seller",
  },
  {
    id: 2,
    title: "Bluetooth Headphones",
    price: 1999,
    originalPrice: 3999,
    description: "Wireless bluetooth headphones with 20hr battery life.",
    image: "/assets/generated/product-headphones.dim_400x400.jpg",
    rating: 4.5,
    reviews: 3892,
    badge: "50% Off",
  },
  {
    id: 3,
    title: "Smart Watch",
    price: 3499,
    originalPrice: 5999,
    description: "Modern smartwatch with health tracking and notifications.",
    image: "/assets/generated/product-watch.dim_400x400.jpg",
    rating: 4.4,
    reviews: 2156,
    badge: "New Arrival",
  },
  {
    id: 4,
    title: "Running Shoes",
    price: 2299,
    originalPrice: 3499,
    description: "Lightweight running shoes with cushioned sole.",
    image: "/assets/generated/product-shoes.dim_400x400.jpg",
    rating: 4.6,
    reviews: 5431,
    badge: "Top Rated",
  },
  {
    id: 5,
    title: "Leather Wallet",
    price: 699,
    originalPrice: 1299,
    description: "Genuine leather bifold wallet with card slots.",
    image: "/assets/generated/product-wallet.dim_400x400.jpg",
    rating: 4.2,
    reviews: 876,
    badge: null,
  },
  {
    id: 6,
    title: "Travel Backpack",
    price: 1599,
    originalPrice: 2499,
    description: "Durable backpack with laptop compartment and USB port.",
    image: "/assets/generated/product-backpack.dim_400x400.jpg",
    rating: 4.4,
    reviews: 2087,
    badge: "Trending",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className="w-3 h-3"
          style={{
            fill:
              star <= Math.round(rating)
                ? "oklch(0.75 0.17 52)"
                : "oklch(0.88 0.01 240)",
            color:
              star <= Math.round(rating)
                ? "oklch(0.75 0.17 52)"
                : "oklch(0.88 0.01 240)",
          }}
        />
      ))}
    </div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function ProductGrid() {
  const { addToCart } = useCart();

  const handleAddToCart = (product: (typeof products)[0]) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    toast.success(`${product.title} added to cart!`, {
      duration: 2000,
      position: "bottom-center",
    });
  };

  const discount = (original: number, current: number) =>
    Math.round(((original - current) / original) * 100);

  return (
    <main className="max-w-7xl mx-auto px-3 md:px-6 py-4">
      {/* Hero banner */}
      <div className="mb-4 rounded-lg overflow-hidden bg-gradient-to-r from-amazon-navy to-amazon-navy-light p-6 md:p-8 text-white relative">
        <div className="relative z-10">
          <p className="text-amazon-orange font-semibold text-sm tracking-widest uppercase mb-1">
            Welcome to
          </p>
          <h1 className="font-display font-black text-3xl md:text-5xl mb-2">
            GiLL EMPIOR
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-md">
            Discover premium products at unbeatable prices. Free delivery on
            orders above ₹499.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Zap className="w-4 h-4 text-amazon-orange" />
            <span className="text-sm text-amazon-orange font-semibold">
              Lightning deals active now
            </span>
          </div>
        </div>
        <div className="absolute right-4 top-4 text-8xl opacity-10 font-display font-black select-none">
          GE
        </div>
      </div>

      {/* Section heading */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-xl md:text-2xl text-foreground">
          Featured Products
        </h2>
        <span className="text-sm text-amazon-orange font-semibold cursor-pointer hover:underline">
          See all deals →
        </span>
      </div>

      {/* Product grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            data-ocid={`product.item.${index + 1}`}
            className="product-card bg-card rounded-lg overflow-hidden shadow-card flex flex-col"
          >
            {/* Product image */}
            <div className="relative bg-white">
              {product.badge && (
                <span className="absolute top-2 left-2 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amazon-orange text-amazon-navy">
                  {product.badge}
                </span>
              )}
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="p-3 flex flex-col flex-1 gap-1">
              <h3 className="font-semibold text-sm md:text-base leading-snug text-foreground line-clamp-2">
                {product.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 hidden md:block">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1.5">
                <StarRating rating={product.rating} />
                <span className="text-xs text-blue-600 hover:underline cursor-pointer">
                  ({product.reviews.toLocaleString("en-IN")})
                </span>
              </div>

              {/* Price */}
              <div className="mt-auto pt-1">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="font-bold text-lg md:text-xl text-foreground">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs font-semibold price-green">
                    ({discount(product.originalPrice, product.price)}% off)
                  </span>
                </div>
                <p className="text-[11px] price-green font-medium">
                  FREE Delivery
                </p>
              </div>

              {/* Add to cart button */}
              <button
                type="button"
                data-ocid={`product.add_button.${index + 1}`}
                onClick={() => handleAddToCart(product)}
                className="btn-amazon mt-2 w-full py-1.5 text-sm font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Trust badges */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            icon: "🚚",
            title: "Free Delivery",
            subtitle: "On orders above ₹499",
          },
          {
            icon: "🔄",
            title: "Easy Returns",
            subtitle: "30-day return policy",
          },
          {
            icon: "🔒",
            title: "Secure Payment",
            subtitle: "100% safe checkout",
          },
          {
            icon: "💬",
            title: "24/7 Support",
            subtitle: "Always here to help",
          },
        ].map((badge) => (
          <div
            key={badge.title}
            className="flex items-center gap-3 bg-card rounded-lg p-3 shadow-xs border border-border"
          >
            <span className="text-2xl">{badge.icon}</span>
            <div>
              <p className="text-xs font-semibold text-foreground">
                {badge.title}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {badge.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
