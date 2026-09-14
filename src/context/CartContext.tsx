import { useState, useEffect, ReactNode } from "react";
import { CartContext } from "./CartContextObject";
import { Product, CartItem } from "../types";

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (
    product: Product,
    quantity: number,
    size: number | string,
    color: string,
  ) => {
    setCartItems((prevItems) => {
      const cartKey = `${product.id}-${size}-${color}`;
      const existingItemIndex = prevItems.findIndex(
        (item) => item.cartKey === cartKey,
      );

      if (existingItemIndex > -1) {
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          cartKey,
          quantity,
          size,
          color,
          price: product.price, // Número puro direto da fonte
        },
      ];
    });
  };

  const updateQuantity = (cartKey: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.cartKey === cartKey) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null),
    );
  };

  const removeFromCart = (cartKey: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cartKey !== cartKey),
    );
  };

  const clearCart = () => setCartItems([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
