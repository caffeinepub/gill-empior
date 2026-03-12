import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, MapPin, Menu, Search, ShoppingCart } from "lucide-react";
import { useRef } from "react";

const CATEGORIES = [
  "All",
  "Electronics",
  "Fashion",
  "Sports",
  "Bags",
  "Accessories",
];

interface HeaderProps {
  onCartOpen: () => void;
  onLogoClick: () => void;
  onWishlistOpen: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onAdminOpen: () => void;
}

export function Header({
  onCartOpen,
  onLogoClick,
  onWishlistOpen,
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  onAdminOpen,
}: HeaderProps) {
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();

  // Secret admin: 5 quick clicks on logo
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoClick = () => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 2000);
    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      onAdminOpen();
      return;
    }
    onLogoClick();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <header className="sticky top-0 z-50 bg-amazon-navy text-white shadow-lg">
      {/* Main header row */}
      <div className="flex items-center gap-2 px-3 py-2 md:px-6 md:gap-4">
        {/* Logo */}
        <button
          type="button"
          data-ocid="nav.link"
          onClick={handleLogoClick}
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
        <form className="flex-1 flex" onSubmit={handleSearchSubmit}>
          <div className="flex w-full rounded-md overflow-hidden">
            <input
              type="text"
              data-ocid="search.input"
              placeholder="Search GiLL EMPIOR..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1 px-3 py-2 text-sm text-foreground bg-white outline-none min-w-0"
            />
            <button
              type="submit"
              data-ocid="search.button"
              className="bg-amazon-orange hover:bg-amazon-orange/90 px-3 flex items-center justify-center flex-shrink-0 transition-colors"
            >
              <Search className="w-5 h-5 text-amazon-navy" />
            </button>
          </div>
        </form>

        {/* Right actions */}
        <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
          {/* Account */}
          <div className="hidden md:flex flex-col cursor-pointer border-2 border-transparent hover:border-white rounded px-2 py-1 transition-colors">
            <span className="text-[10px] text-white/70">Hello, Guest</span>
            <span className="text-xs font-semibold">Account &amp; Lists</span>
          </div>

          {/* Wishlist */}
          <button
            type="button"
            data-ocid="wishlist.button"
            onClick={onWishlistOpen}
            className="relative flex flex-col items-center border-2 border-transparent hover:border-white rounded px-2 py-1 transition-colors"
          >
            <div className="relative">
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-1 cart-badge text-xs font-black w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold hidden md:block">
              Wishlist
            </span>
          </button>

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

      {/* Sub-nav categories */}
      <div className="bg-amazon-navy-light px-3 py-1 flex items-center gap-1 text-sm overflow-x-auto scrollbar-none">
        <button
          type="button"
          className="flex items-center gap-1 text-white/90 hover:text-white whitespace-nowrap py-1 border-2 border-transparent hover:border-white rounded px-2 transition-colors"
        >
          <Menu className="w-4 h-4" />
          <span className="font-medium">Browse</span>
        </button>
        {CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat}
            data-ocid="category.tab"
            onClick={() => onCategoryChange(cat)}
            className={`text-white/90 hover:text-white whitespace-nowrap py-1 border-2 rounded px-2 transition-colors font-medium ${
              activeCategory === cat
                ? "border-white text-white bg-white/10"
                : "border-transparent hover:border-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </header>
  );
}
