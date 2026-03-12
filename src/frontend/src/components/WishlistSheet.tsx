import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products";
import { Heart, ShoppingCart, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";

interface WishlistSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WishlistSheet({ isOpen, onClose }: WishlistSheetProps) {
  const { wishlistIds, toggleWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();

  const wishlisted = products.filter((p) => wishlistIds.has(p.id));

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            data-ocid="wishlist.panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-amazon-navy text-white">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 fill-red-400 text-red-400" />
                <h2 className="font-display font-bold text-lg">
                  Wishlist ({wishlistCount})
                </h2>
              </div>
              <button
                type="button"
                data-ocid="wishlist.close_button"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {wishlisted.length === 0 ? (
              <div
                data-ocid="wishlist.empty_state"
                className="flex-1 flex flex-col items-center justify-center gap-3 text-muted-foreground"
              >
                <Heart className="w-16 h-16 opacity-20" />
                <p className="font-semibold text-lg">Your wishlist is empty</p>
                <p className="text-sm">Save items you love</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-amazon px-6 py-2 text-sm font-semibold"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {wishlisted.map((product, index) => (
                  <div
                    key={product.id}
                    data-ocid={`wishlist.item.${index + 1}`}
                    className="flex gap-3 bg-card rounded-lg p-3 shadow-xs border border-border"
                  >
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-white flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm line-clamp-2 text-foreground">
                        {product.title}
                      </p>
                      <p className="text-amazon-orange font-bold text-base mt-0.5">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                      <p className="text-xs text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <button
                          type="button"
                          data-ocid={`wishlist.add_button.${index + 1}`}
                          onClick={() => handleAddToCart(product)}
                          className="btn-amazon px-3 py-1 text-xs font-semibold flex items-center gap-1"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          Add to Cart
                        </button>
                        <button
                          type="button"
                          data-ocid={`wishlist.delete_button.${index + 1}`}
                          onClick={() => toggleWishlist(product.id)}
                          className="p-1.5 text-destructive hover:bg-destructive/10 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
