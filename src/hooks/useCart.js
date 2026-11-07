import { useState, useMemo, useCallback } from "react";

export function useCart() {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) {
      setCart((prev) => prev.filter((item) => item.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const totalQuantity = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalQuantity,
    totalPrice,
  };
}
