import { useState, useEffect } from "react";
import { CartContext } from "./CartContextObject";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity, size, color) => {
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
          price:
            typeof product.price === "string"
              ? parseFloat(
                  product.price
                    .replace("R$ ", "")
                    .replace(".", "")
                    .replace(",", "."),
                )
              : product.price,
        },
      ];
    });
    openCart(); // Abre o carrinho automaticamente ao adicionar um item
  };

  const updateQuantity = (cartKey, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.cartKey === cartKey) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  const removeFromCart = (cartKey) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cartKey !== cartKey),
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
