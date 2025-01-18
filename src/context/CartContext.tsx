// context/CartContext.tsx
import React, { createContext, useState, useContext } from 'react';
import data from '../data.json';

interface CartItem {
  id: number;
  quantity: number;
}

interface CartContextType {
  cart: number[];
  total: number;
  count: number;
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
  clearItem: () => void;
  removeCard: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState(Array(data.length).fill(0));
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  const addItem = (id: number) => {
    const newCart = [...cart];
    newCart[id] += 1;
    setCount(count + 1);
    setCart(newCart);
    setTotal(total + data[id].price);
  };

  const removeItem = (id: number) => {
    const newCart = [...cart];
    if (newCart[id] > 0) {
      newCart[id] -= 1;
      setCount(count - 1);
      setCart(newCart);
      setTotal(total - data[id].price);
    }
  };

  const clearItem = () => {
    const newCart = Array(data.length).fill(0);
    setCart(newCart);
    setCount(0);
    setTotal(0);
  };

  const removeCard = (id: number) => {
    const newCart = [...cart];
    setTotal(total - cart[id] * data[id].price);
    setCount(count - cart[id]);
    newCart[id] = 0;
    setCart(newCart);
  };

  const value: CartContextType = {
    cart,
    total,
    count,
    addItem,
    removeItem,
    clearItem,
    removeCard,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};