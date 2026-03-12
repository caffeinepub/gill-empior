import { useCart } from "@/context/CartContext";
import { MapPin, Menu, Search, ShoppingCart } from "lucide-react";

interface HeaderProps {
  onCartOpen: () => void;
  onLogoClick: () => void;
}

export function Header({ onCartOpen, onLogoClick }: HeaderProps) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-amazon-navy text-white shadow-lg">
      {/* Main header row */}
      <div className="flex items-center gap-2 px-3 py-2 md:px-6 md:gap-4">
        {/* Logo */}
        <button
          type="button"
          data-ocid="nav.link"
          onClick={onLogoClick}
          className="flex-shrink-0 flex flex-col items-center border-2 border-transparent hover:border-white rounded px-2 py-1 transition-colors"
        >
          <span className="font-display font-black text-xl md:text-2xl text-amazon-orange leading-none tracking-tight">
            GiLL
          </span>
          <span className="font-display font-black text-sm md:text-base text-white leading-none tracking-widest">
            EMPIOR
          </span>
        </button>

        {/* Delivery location */}
        <div className="hidden md:flex items-center gap-1 flex-shrink-0 cursor-pointer hover:border border-transparent hover:border-white rounded px-1 py-1">
          <MapPin className="w-4 h-4 text-white/70 mt-1" />
          <div>
            <p className="text-[10px] text-white/70">Deliver to</p>
            <p className="text-xs font-semibold text-white">India</p>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex-1 flex">
          <div className="flex w-full rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search GiLL EMPIOR..."
              className="flex-1 px-3 py-2 text-sm text-foreground bg-white outline-none min-w-0"
            />
            <button
              type="button"
              className="bg-amazon-orange hover:bg-amazon-orange/90 px-3 flex items-center justify-center flex-shrink-0 transition-colors"
            >
              <Search className="w-5 h-5 text-amazon-navy" />
            </button>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
          {/* Account */}
          <div className="hidden md:flex flex-col cursor-pointer border-2 border-transparent hover:border-white rounded px-2 py-1 transition-colors">
            <span className="text-[10px] text-white/70">Hello, Guest</span>
            <span className="text-xs font-semibold">Account &amp; Lists</span>
          </div>

          {/* Cart */}
          <button
            type="button"
            data-ocid="nav.cart_button"
            onClick={onCartOpen}
            className="relative flex flex-col items-center border-2 border-transparent hover:border-white rounded px-2 py-1 transition-colors"
          >
            <div className="relative">
              <ShoppingCart className="w-7 h-7" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-1 cart-badge text-xs font-black w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold hidden md:block">Cart</span>
          </button>

          {/* Menu for mobile */}
          <button
            type="button"
            className="md:hidden border-2 border-transparent hover:border-white rounded p-1 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sub-nav */}
      <div className="bg-amazon-navy-light px-3 py-1 flex items-center gap-4 text-sm overflow-x-auto scrollbar-none">
        <button
          type="button"
          className="flex items-center gap-1 text-white/90 hover:text-white whitespace-nowrap py-1 border-2 border-transparent hover:border-white rounded px-2 transition-colors"
        >
          <Menu className="w-4 h-4" />
          <span className="font-medium">All</span>
        </button>
        {["Electronics", "Fashion", "Sports", "Bags", "Accessories"].map(
          (cat) => (
            <button
              type="button"
              key={cat}
              className="text-white/90 hover:text-white whitespace-nowrap py-1 border-2 border-transparent hover:border-white rounded px-2 transition-colors"
            >
              {cat}
            </button>
          ),
        )}
      </div>
    </header>
  );
}
