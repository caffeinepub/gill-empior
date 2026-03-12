import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products";
import { Heart, ShoppingCart, Star, Zap } from "lucide-react";
import type { Variants } from "motion/react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface ProductGridProps {
  searchQuery: string;
  activeCategory: string;
}

type Product = (typeof products)[0];

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

function ProductDetailModal({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<
    "idle" | "valid" | "invalid"
  >("idle");

  const checkPincode = () => {
    if (pincode.length < 6) {
      setPincodeStatus("invalid");
    } else {
      setPincodeStatus("valid");
    }
  };

  if (!product) return null;

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  const handleAddToCart = () => {
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
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-ocid="product.detail.modal"
        className="max-w-lg w-full p-0 overflow-hidden"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{product.title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative bg-white md:w-56 flex-shrink-0">
            <img
              src={product.image}
              alt={product.title}
              className="w-full md:w-56 aspect-square object-cover"
            />
            {product.badge && (
              <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amazon-orange text-amazon-navy">
                {product.badge}
              </span>
            )}
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-2 right-2 bg-white/80 backdrop-blur rounded-full p-1.5 shadow"
            >
              <Heart
                className="w-4 h-4"
                style={{
                  fill: isWishlisted(product.id) ? "#ef4444" : "none",
                  color: isWishlisted(product.id) ? "#ef4444" : "#888",
                }}
              />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 p-4 flex flex-col gap-3">
            <h2 className="font-display font-bold text-lg leading-snug text-foreground">
              {product.title}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-xs text-blue-600">
                {product.reviews.toLocaleString("en-IN")} ratings
              </span>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-black text-2xl text-foreground">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-sm font-bold price-green">
                  ({discount}% off)
                </span>
              </div>
              <p className="text-xs price-green">FREE Delivery</p>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Pincode check */}
            <div className="bg-muted/40 rounded-lg p-3">
              <p className="text-xs font-semibold text-foreground mb-2">
                Check delivery to your pincode
              </p>
              <div className="flex gap-2">
                <Input
                  data-ocid="pincode.input"
                  placeholder="Enter 6-digit pincode"
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setPincodeStatus("idle");
                  }}
                  className="flex-1 h-8 text-sm"
                  maxLength={6}
                />
                <Button
                  data-ocid="pincode.button"
                  onClick={checkPincode}
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs"
                >
                  Check
                </Button>
              </div>
              {pincodeStatus === "valid" && (
                <p className="text-xs price-green mt-1.5 font-medium">
                  ✓ Delivery available in 3-5 days
                </p>
              )}
              {pincodeStatus === "invalid" && (
                <p className="text-xs text-destructive mt-1.5">
                  ✗ Please enter a valid 6-digit pincode
                </p>
              )}
            </div>

            {/* Add to cart */}
            <button
              type="button"
              data-ocid="product.detail.add_button"
              onClick={handleAddToCart}
              className="btn-amazon w-full py-2.5 font-bold flex items-center justify-center gap-2 rounded-full"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function ProductGrid({ searchQuery, activeCategory }: ProductGridProps) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = products.filter((p) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
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

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const discount = (original: number, current: number) =>
    Math.round(((original - current) / original) * 100);

  return (
    <main className="max-w-7xl mx-auto px-3 md:px-6 py-4">
      {/* Hero banner — only show when no search/filter active */}
      {searchQuery === "" && activeCategory === "All" && (
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
      )}

      {/* Section heading */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-xl md:text-2xl text-foreground">
          {searchQuery || activeCategory !== "All"
            ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""} found`
            : "Featured Products"}
        </h2>
        {(searchQuery || activeCategory !== "All") && (
          <span className="text-sm text-muted-foreground">
            {activeCategory !== "All" ? activeCategory : "All categories"}
          </span>
        )}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div
          data-ocid="product.empty_state"
          className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3"
        >
          <ShoppingCart className="w-16 h-16 opacity-20" />
          <p className="font-semibold text-lg">No products found</p>
          <p className="text-sm">Try a different search or category</p>
        </div>
      )}

      {/* Product grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4"
      >
        {filtered.map((product, index) => (
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
              {/* Wishlist button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur rounded-full p-1.5 shadow transition-transform hover:scale-110"
              >
                <Heart
                  className="w-4 h-4"
                  style={{
                    fill: isWishlisted(product.id) ? "#ef4444" : "none",
                    color: isWishlisted(product.id) ? "#ef4444" : "#888",
                  }}
                />
              </button>
              {/* Image as button */}
              <button
                type="button"
                onClick={() => openModal(product)}
                className="aspect-square w-full overflow-hidden block cursor-pointer bg-transparent border-0 p-0"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </button>
            </div>

            {/* Product info */}
            <div className="p-3 flex flex-col flex-1 gap-1">
              <button
                type="button"
                onClick={() => openModal(product)}
                className="font-semibold text-sm md:text-base leading-snug text-foreground line-clamp-2 text-left hover:text-amazon-orange transition-colors"
              >
                {product.title}
              </button>
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
      {filtered.length > 0 && (
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
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </main>
  );
}
