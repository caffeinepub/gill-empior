import { createContext, useContext, useEffect, useState } from "react";

interface WishlistContextType {
  wishlistIds: Set<number>;
  toggleWishlist: (id: number) => void;
  isWishlisted: (id: number) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

const STORAGE_KEY = "gill_empior_wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<Set<number>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const arr: number[] = JSON.parse(stored);
        return new Set(arr);
      }
    } catch {
      // ignore
    }
    return new Set();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...wishlistIds]));
  }, [wishlistIds]);

  const toggleWishlist = (id: number) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isWishlisted = (id: number) => wishlistIds.has(id);

  const wishlistCount = wishlistIds.size;

  return (
    <WishlistContext.Provider
      value={{ wishlistIds, toggleWishlist, isWishlisted, wishlistCount }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
