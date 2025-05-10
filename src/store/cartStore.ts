import { create } from 'zustand';
import { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  totalItems: number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (product) => {
    const items = get().items;
    const existingItem = items.find(item => item.id === product.id);

    if (existingItem) {
      const updatedItems = items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      set({ items: updatedItems });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] });
    }
  },
  removeItem: (productId) => {
    const items = get().items;
    const item = items.find(item => item.id === productId);

    if (item && item.quantity > 1) {
      const updatedItems = items.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      set({ items: updatedItems });
    } else {
      set({ items: items.filter(item => item.id !== productId) });
    }
  },
  clearCart: () => set({ items: [] }),
  get totalItems() {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));