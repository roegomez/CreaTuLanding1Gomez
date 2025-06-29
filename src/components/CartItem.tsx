import React from 'react';
import { Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  return (
    <div className="flex items-center space-x-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <img src={item.image} alt={item.name} className="h-24 w-24 object-cover rounded-lg" />
      <div className="flex-1">
        <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500 mb-2">Precio unitario: ${item.price.toLocaleString()}</p>
        <p className="text-sm text-gray-700">Cantidad: {item.quantity}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-gray-900 mb-2">
          ${(item.price * item.quantity).toLocaleString()}
        </p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 transition-colors duration-200"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;