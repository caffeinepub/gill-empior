import { AdminPanel } from "@/components/AdminPanel";
import { CartSheet } from "@/components/CartSheet";
import { CheckoutPage } from "@/components/CheckoutPage";
import { Header } from "@/components/Header";
import { OrderSuccess } from "@/components/OrderSuccess";
import { ProductGrid } from "@/components/ProductGrid";
import { WishlistSheet } from "@/components/WishlistSheet";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const queryClient = new QueryClient();

type View = "home" | "checkout" | "success" | "admin";

function StoreApp() {
  const [view, setView] = useState<View>("home");
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const handleOrderSuccess = (id: string) => {
    setOrderId(id);
    setView("success");
  };

  const handleContinueShopping = () => {
    setView("home");
    setOrderId("");
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setView("home");
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    if (view !== "home") setView("home");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {view !== "success" && (
        <Header
          onCartOpen={() => setCartOpen(true)}
          onLogoClick={() => {
            setView("home");
            setSearchQuery("");
            setActiveCategory("All");
          }}
          onWishlistOpen={() => setWishlistOpen(true)}
          onAdminOpen={() => setView("admin")}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      )}

      {/* Main content */}
      <div className="flex-1">
        {view === "home" && (
          <ProductGrid
            searchQuery={searchQuery}
            activeCategory={activeCategory}
          />
        )}
        {view === "checkout" && (
          <CheckoutPage
            onBack={() => setView("home")}
            onSuccess={handleOrderSuccess}
          />
        )}
        {view === "success" && (
          <OrderSuccess orderId={orderId} onContinue={handleContinueShopping} />
        )}
        {view === "admin" && <AdminPanel onBack={() => setView("home")} />}
      </div>

      {/* Cart sheet */}
      <CartSheet
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => setView("checkout")}
      />

      {/* Wishlist sheet */}
      <WishlistSheet
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />

      {/* Footer */}
      {view === "home" && (
        <footer className="bg-amazon-navy text-white mt-8">
          <div className="bg-amazon-navy-light py-3 text-center">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              ↑ Back to top
            </button>
          </div>
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            {[
              {
                title: "Get to Know Us",
                links: [
                  "About GiLL EMPIOR",
                  "Careers",
                  "Press Releases",
                  "Amazon Science",
                ],
              },
              {
                title: "Connect with Us",
                links: ["Facebook", "Twitter", "Instagram"],
              },
              {
                title: "Make Money with Us",
                links: [
                  "Sell on GiLL EMPIOR",
                  "Affiliate Programme",
                  "Advertise Your Products",
                ],
              },
              {
                title: "Let Us Help You",
                links: [
                  "Your Account",
                  "Returns Centre",
                  "Track Orders",
                  "Help",
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-bold text-white mb-3">{col.title}</h4>
                <ul className="space-y-1.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="/"
                        className="text-white/60 hover:text-white transition-colors text-xs"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-amazon-navy-light py-4 text-center">
            <p className="text-white/50 text-xs">
              © {new Date().getFullYear()} GiLL EMPIOR. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amazon-orange hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </footer>
      )}

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <WishlistProvider>
          <StoreApp />
        </WishlistProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}
