import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addItem: (item: Product, quantity: number) => void;
  removeItem: (itemId: number) => void;
  clear: () => void;
  isInCart: (itemId: number) => boolean;
  getTotalQuantity: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addItem = (item: Product, quantity: number) => {
    if (isInCart(item.id)) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  const removeItem = (itemId: number) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const clear = () => {
    setCart([]);
  };

  const isInCart = (itemId: number) => {
    return cart.some(item => item.id === itemId);
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    cart,
    addItem,
    removeItem,
    clear,
    isInCart,
    getTotalQuantity,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};