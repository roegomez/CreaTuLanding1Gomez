import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <button className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-md hover:bg-primary-100 transition-colors duration-200">
            <Heart className="h-4 w-4 text-secondary-600 hover:text-secondary-700 transition-colors duration-200" />
          </button>
        </div>
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        <div className="mb-1">
          <span className="text-xs font-medium text-primary-700 bg-primary-100 px-2 py-0.5 rounded-full">{product.category}</span>
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-1 font-display line-clamp-1">{product.name}</h3>
        <p className="text-gray-600 text-xs mb-3 flex-grow line-clamp-2">{product.description}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${product.price.toLocaleString()}</span>
          <button 
            onClick={handleAddToCart}
            className="bg-secondary-500 hover:bg-secondary-600 text-white px-2 py-1.5 rounded-full flex items-center transition-colors duration-200"
          >
            <ShoppingCart className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">Agregar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;