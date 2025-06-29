import React, { useState } from 'react';
import { Trash2, ImageOff } from 'lucide-react';
import { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    console.log('Cart item image failed to load:', item.image);
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    console.log('Cart item image loaded successfully:', item.image);
    setImageLoading(false);
  };

  return (
    <div className="flex items-center space-x-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative flex-shrink-0">
        {imageLoading && (
          <div className="h-24 w-24 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
            <div className="text-xs text-gray-400">...</div>
          </div>
        )}
        
        {imageError ? (
          <div className="h-24 w-24 bg-gray-100 rounded-lg flex items-center justify-center">
            <ImageOff className="h-8 w-8 text-gray-400" />
          </div>
        ) : (
          <img 
            src={item.image} 
            alt={item.name} 
            className={`h-24 w-24 object-cover rounded-lg ${
              imageLoading ? 'opacity-0 absolute' : 'opacity-100'
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium text-gray-900 truncate">{item.name}</h3>
        <p className="text-sm text-gray-500 mb-2">Precio unitario: ${item.price.toLocaleString()}</p>
        <p className="text-sm text-gray-700">Cantidad: {item.quantity}</p>
      </div>
      
      <div className="text-right flex-shrink-0">
        <p className="text-lg font-semibold text-gray-900 mb-2">
          ${(item.price * item.quantity).toLocaleString()}
        </p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 hover:bg-red-50 rounded"
          title="Eliminar producto"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;