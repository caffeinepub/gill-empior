import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartSheet({ isOpen, onClose, onCheckout }: CartSheetProps) {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Cart panel */}
          <motion.div
            data-ocid="cart.panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-amazon-navy text-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="font-display font-bold text-lg">
                  Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
                </h2>
              </div>
              <button
                type="button"
                data-ocid="cart.close_button"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart items */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                <ShoppingBag className="w-16 h-16 opacity-20" />
                <p className="font-semibold text-lg">Your cart is empty</p>
                <p className="text-sm">Add items to get started</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-amazon px-6 py-2 text-sm font-semibold"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-3">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        data-ocid={`cart.item.${index + 1}`}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-3 bg-card rounded-lg p-3 shadow-xs border border-border"
                      >
                        {/* Image */}
                        <div className="w-20 h-20 rounded-md overflow-hidden bg-white flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm line-clamp-2 text-foreground">
                            {item.title}
                          </p>
                          <p className="text-amazon-orange font-bold text-base mt-0.5">
                            ₹
                            {(item.price * item.quantity).toLocaleString(
                              "en-IN",
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ₹{item.price.toLocaleString("en-IN")} each
                          </p>

                          {/* Quantity controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center border border-border rounded-full overflow-hidden">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="px-2 py-1 hover:bg-muted transition-colors text-foreground"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-3 text-sm font-semibold min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="px-2 py-1 hover:bg-muted transition-colors text-foreground"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="p-1.5 text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Footer */}
                <div className="p-4 border-t border-border bg-card">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-muted-foreground text-sm">
                      Subtotal ({totalItems} items)
                    </span>
                    <span className="font-bold text-lg">
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="text-xs price-green mb-3">
                    FREE Delivery on this order
                  </p>
                  <button
                    type="button"
                    data-ocid="cart.checkout_button"
                    onClick={() => {
                      onClose();
                      onCheckout();
                    }}
                    className="w-full btn-amazon py-3 text-base font-bold rounded-full"
                  >
                    Proceed to Checkout (₹{totalPrice.toLocaleString("en-IN")})
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
