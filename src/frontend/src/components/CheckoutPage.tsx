import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { useSubmitOrder } from "@/hooks/useQueries";
import { ArrowLeft, ChevronRight, Loader2, Shield, Truck } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface CheckoutPageProps {
  onBack: () => void;
  onSuccess: (orderId: string) => void;
}

export function CheckoutPage({ onBack, onSuccess }: CheckoutPageProps) {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const submitOrder = useSubmitOrder();

  const [form, setForm] = useState({
    name: "",
    address: "",
    mobile: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.address.trim())
      newErrors.address = "Delivery address is required";
    if (!form.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^[6-9]\d{9}$/.test(form.mobile.trim()))
      newErrors.mobile = "Enter a valid 10-digit Indian mobile number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Log to console as admin notification
    console.log("[GiLL EMPIOR] New Order Received:", {
      customer: { name: form.name, address: form.address, mobile: form.mobile },
      products: items.map((i) => ({
        id: i.id,
        title: i.title,
        price: i.price,
        quantity: i.quantity,
      })),
      total: totalPrice,
      timestamp: new Date().toISOString(),
    });

    try {
      await submitOrder.mutateAsync({
        customerName: form.name,
        address: form.address,
        mobile: form.mobile,
        products: items.map((i) => ({
          id: i.id,
          title: i.title,
          price: i.price,
          quantity: i.quantity,
        })),
      });
      clearCart();
      const orderId = `GE${Date.now().toString().slice(-8)}`;
      onSuccess(orderId);
    } catch (err) {
      console.error("Order submission failed:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-3 md:px-6 py-4"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shopping
        </button>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-semibold text-foreground">Checkout</span>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Left: Form */}
        <div className="md:col-span-2 space-y-4">
          {/* Delivery details */}
          <div className="bg-card rounded-lg p-4 shadow-xs border border-border">
            <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-amazon-orange" />
              Delivery Details
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              id="checkout-form"
            >
              {/* Name */}
              <div className="space-y-1">
                <Label htmlFor="name" className="text-sm font-semibold">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  data-ocid="checkout.name_input"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Enter your full name"
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p
                    data-ocid="checkout.error_state"
                    className="text-xs text-destructive"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="space-y-1">
                <Label htmlFor="address" className="text-sm font-semibold">
                  Delivery Address *
                </Label>
                <Textarea
                  id="address"
                  data-ocid="checkout.address_textarea"
                  value={form.address}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, address: e.target.value }))
                  }
                  placeholder="House/Flat No., Street, Area, City, State, PIN Code"
                  rows={3}
                  className={errors.address ? "border-destructive" : ""}
                />
                {errors.address && (
                  <p className="text-xs text-destructive">{errors.address}</p>
                )}
              </div>

              {/* Mobile */}
              <div className="space-y-1">
                <Label htmlFor="mobile" className="text-sm font-semibold">
                  Mobile Number *
                </Label>
                <div className="flex">
                  <span className="flex items-center px-3 bg-muted border border-r-0 border-border rounded-l-md text-sm font-semibold text-foreground">
                    +91
                  </span>
                  <Input
                    id="mobile"
                    data-ocid="checkout.mobile_input"
                    value={form.mobile}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
                      }))
                    }
                    placeholder="10-digit mobile number"
                    className={`rounded-l-none ${errors.mobile ? "border-destructive" : ""}`}
                    inputMode="numeric"
                  />
                </div>
                {errors.mobile && (
                  <p className="text-xs text-destructive">{errors.mobile}</p>
                )}
              </div>
            </form>
          </div>

          {/* Payment method */}
          <div className="bg-card rounded-lg p-4 shadow-xs border border-border">
            <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amazon-orange" />
              Payment Method
            </h2>
            <label
              data-ocid="checkout.cod_radio"
              className="cod-selected flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all"
            >
              <input
                type="radio"
                checked
                readOnly
                className="accent-amazon-orange w-4 h-4"
              />
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-amazon-orange/10 rounded-full flex items-center justify-center text-xl">
                  💵
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    Cash on Delivery
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Pay when you receive your order
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                Available
              </span>
            </label>
          </div>
        </div>

        {/* Right: Order summary */}
        <div className="space-y-3">
          <div className="bg-card rounded-lg p-4 shadow-xs border border-border sticky top-24">
            <h3 className="font-display font-bold text-base mb-3">
              Order Summary
            </h3>

            <div className="space-y-2 mb-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-2 text-sm"
                >
                  <div className="flex gap-2 items-center flex-1 min-w-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-8 h-8 rounded object-cover flex-shrink-0"
                    />
                    <span className="truncate text-xs text-foreground">
                      {item.title} × {item.quantity}
                    </span>
                  </div>
                  <span className="font-semibold text-xs flex-shrink-0">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Subtotal ({totalItems} items)
                </span>
                <span>₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className="price-green font-semibold">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t border-border pt-2 mt-2">
                <span>Order Total</span>
                <span>₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Submit button */}
            {submitOrder.isError && (
              <div
                data-ocid="checkout.error_state"
                className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive"
              >
                Failed to place order. Please try again.
              </div>
            )}

            <button
              data-ocid="checkout.submit_button"
              form="checkout-form"
              type="submit"
              disabled={submitOrder.isPending}
              className="mt-4 w-full btn-amazon py-3 text-base font-bold rounded-full disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitOrder.isPending ? (
                <>
                  <span
                    data-ocid="checkout.loading_state"
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Placing Order...
                  </span>
                </>
              ) : (
                "Place Order"
              )}
            </button>

            <p className="text-[11px] text-muted-foreground text-center mt-2">
              By placing your order, you agree to our Terms & Conditions.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
