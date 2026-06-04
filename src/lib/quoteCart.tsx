import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  categorySlug: string;
  categoryName: string;
  productSlug: string;
  productName: string;
  variant: string;
  unit: string;
  qty: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  removeItem: (productSlug: string, variant: string) => void;
  updateQty: (productSlug: string, variant: string, qty: number) => void;
  total: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: Omit<CartItem, "qty"> & { qty?: number }) => {
    setItems(prev => {
      const existing = prev.find(i => i.productSlug === item.productSlug && i.variant === item.variant);
      if (existing) {
        return prev.map(i =>
          i.productSlug === item.productSlug && i.variant === item.variant
            ? { ...i, qty: i.qty + (item.qty ?? 1) }
            : i
        );
      }
      return [...prev, { ...item, qty: item.qty ?? 1 }];
    });
  };

  const removeItem = (productSlug: string, variant: string) => {
    setItems(prev => prev.filter(i => !(i.productSlug === productSlug && i.variant === variant)));
  };

  const updateQty = (productSlug: string, variant: string, qty: number) => {
    if (qty <= 0) { removeItem(productSlug, variant); return; }
    setItems(prev => prev.map(i =>
      i.productSlug === productSlug && i.variant === variant ? { ...i, qty } : i
    ));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, total: items.length, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useQuoteCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useQuoteCart must be inside QuoteCartProvider");
  return ctx;
}
