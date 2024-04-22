import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id && i.selectedSize === item.selectedSize);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id && i.selectedSize === item.selectedSize
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prevItems, item];
    });
    alert('Added to cart successfully!');
  };

  const removeFromCart = (id, size) => {
    setCartItems(prevItems => prevItems.filter(i => i.id !== id || i.selectedSize !== size));
  };

  const adjustQuantity = (id, size, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(i =>
        i.id === id && i.selectedSize === size ? { ...i, quantity: quantity } : i
      )
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <CartContext.Provider value={{ items: cartItems, addToCart, removeFromCart, adjustQuantity, calculateSubtotal }}>
      {children}
    </CartContext.Provider>
  );
};
