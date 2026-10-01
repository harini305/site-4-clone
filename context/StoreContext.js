'use client';

// Frontend-only store: cart, wishlist, UI panels and toasts.
// State persists to localStorage. There is no backend — checkout is a demo.

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getProduct } from '@/lib/catalog';

const StoreContext = createContext(null);
const STORAGE_KEY = 'shop-decoration:v1';

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]); // [{ slug, qty }]
  const [wishlist, setWishlist] = useState([]); // [slug]
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  // Restore persisted state once on the client.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time restore from storage after hydration
      if (Array.isArray(saved.cart)) setCart(saved.cart.filter((i) => getProduct(i.slug)));
      if (Array.isArray(saved.wishlist)) setWishlist(saved.wishlist.filter((s) => getProduct(s)));
    } catch {
      // storage unavailable or corrupt — start empty
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, wishlist }));
    } catch {
      // ignore quota / privacy mode errors
    }
  }, [cart, wishlist, hydrated]);

  const toast = useCallback((message, type = 'success') => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const dismissToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const addToCart = useCallback(
    (slug, qty = 1) => {
      const product = getProduct(slug);
      if (!product) return;
      setCart((items) => {
        const existing = items.find((i) => i.slug === slug);
        if (existing) return items.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i));
        return [...items, { slug, qty }];
      });
      toast(`“${product.name}” has been added to your basket.`);
    },
    [toast]
  );

  const updateQty = useCallback((slug, qty) => {
    setCart((items) =>
      qty <= 0 ? items.filter((i) => i.slug !== slug) : items.map((i) => (i.slug === slug ? { ...i, qty } : i))
    );
  }, []);

  const removeFromCart = useCallback((slug) => setCart((items) => items.filter((i) => i.slug !== slug)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (slug) => {
      const product = getProduct(slug);
      setWishlist((list) => {
        const has = list.includes(slug);
        return has ? list.filter((s) => s !== slug) : [...list, slug];
      });
      if (product) {
        const had = wishlist.includes(slug);
        toast(had ? `“${product.name}” removed from your wishlist.` : `“${product.name}” added to your wishlist.`);
      }
    },
    [toast, wishlist]
  );

  const cartItems = useMemo(
    () =>
      cart
        .map((i) => ({ ...i, product: getProduct(i.slug) }))
        .filter((i) => i.product)
        .map((i) => ({ ...i, lineTotal: i.product.price * i.qty })),
    [cart]
  );

  const cartCount = cartItems.reduce((n, i) => n + i.qty, 0);
  const cartTotal = cartItems.reduce((n, i) => n + i.lineTotal, 0);

  const value = {
    hydrated,
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    wishlist,
    isWishlisted: (slug) => wishlist.includes(slug),
    toggleWishlist,
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    menuOpen,
    setMenuOpen,
    toasts,
    toast,
    dismissToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}
