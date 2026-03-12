import { CheckCircle, Home, MapPin, Package, Phone } from "lucide-react";
import { motion } from "motion/react";

interface OrderSuccessProps {
  orderId: string;
  onContinue: () => void;
}

export function OrderSuccess({ orderId, onContinue }: OrderSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      data-ocid="order.success_state"
      className="max-w-lg mx-auto px-4 py-12 text-center"
    >
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        className="flex justify-center mb-6"
      >
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-14 h-14 text-green-600" />
        </div>
      </motion.div>

      {/* Thank you message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <h1 className="font-display font-black text-3xl text-foreground mb-2">
          Order Placed! 🎉
        </h1>
        <p className="text-muted-foreground text-base mb-4">
          Thank you for shopping with{" "}
          <span className="font-bold text-amazon-orange">GiLL EMPIOR</span>!
          Your order has been confirmed.
        </p>

        {/* Order ID card */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6 text-left shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amazon-orange/10 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-amazon-orange" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Order ID</p>
              <p className="font-mono font-bold text-lg text-foreground">
                {orderId}
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-amazon-orange mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Payment Method</p>
                <p className="font-semibold">Cash on Delivery (COD)</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amazon-orange mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">
                  Estimated Delivery
                </p>
                <p className="font-semibold">3-5 Business Days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-3 gap-2 mb-8">
          {[
            { icon: "✅", label: "Order Confirmed" },
            { icon: "📦", label: "Being Packed" },
            { icon: "🚚", label: "Out for Delivery" },
          ].map((step, i) => (
            <div key={step.label} className="flex flex-col items-center gap-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  i === 0 ? "bg-green-100" : "bg-muted"
                }`}
              >
                {step.icon}
              </div>
              <p
                className={`text-[11px] font-medium ${i === 0 ? "text-green-700" : "text-muted-foreground"}`}
              >
                {step.label}
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          data-ocid="order.continue_button"
          onClick={onContinue}
          className="btn-amazon px-8 py-3 text-base font-bold rounded-full flex items-center gap-2 mx-auto"
        >
          <Home className="w-5 h-5" />
          Continue Shopping
        </button>
      </motion.div>
    </motion.div>
  );
}
