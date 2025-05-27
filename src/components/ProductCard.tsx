import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <Link to={`/item/${product.id}`} className="block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full fade-in">
        <div className="relative group">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-56 object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-3 right-3">
            <button className="bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-primary-50 transition-colors duration-200 transform hover:scale-110">
              <Heart className="h-5 w-5 text-secondary-500 hover:text-secondary-600 transition-colors duration-200" />
            </button>
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <div className="mb-2">
            <span className="text-sm font-medium text-primary-700 bg-primary-50 px-3 py-1 rounded-full">{product.category}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 font-display line-clamp-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">{product.description}</p>
          
          <div className="mt-auto flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
            <button 
              onClick={handleAddToCart}
              className="btn-secondary flex items-center gap-2 py-2 px-4 text-sm"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Agregar</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;