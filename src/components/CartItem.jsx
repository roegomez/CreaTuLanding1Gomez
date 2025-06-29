import React from 'react';
import { Trash2 } from 'lucide-react';

const CartItem = ({ id, name, price, quantity, img, onRemove }) => {
  return (
    <div className="flex items-center space-x-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <img src={img} alt={name} className="h-24 w-24 object-cover rounded-lg" />
      <div className="flex-1">
        <h3 className="text-base font-medium text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">Precio unitario: ${price.toLocaleString()}</p>
        <p className="text-sm text-gray-700">Cantidad: {quantity}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-gray-900 mb-2">
          ${(price * quantity).toLocaleString()}
        </p>
        <button
          onClick={() => onRemove(id)}
          className="text-red-500 hover:text-red-700 transition-colors duration-200"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;