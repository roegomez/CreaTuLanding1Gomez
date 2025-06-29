import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartWidget = () => {
  const { getTotalQuantity } = useCart();
  const totalQuantity = getTotalQuantity();
  
  return (
    <div className="relative cursor-pointer group">
      <ShoppingBag className="h-6 w-6 text-gray-700 group-hover:text-primary-600 transition-colors duration-200" />
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
          {totalQuantity}
        </span>
      )}
    </div>
  );
};

export default CartWidget;