import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

interface CartWidgetProps {
  onClick: () => void;
}

const CartWidget: React.FC<CartWidgetProps> = ({ onClick }) => {
  const items = useCartStore(state => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <div className="relative cursor-pointer group" onClick={onClick}>
      <ShoppingBag className="h-6 w-6 text-gray-700 group-hover:text-primary-600 transition-colors duration-200" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartWidget;