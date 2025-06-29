import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ImageOff } from 'lucide-react';
import { Product } from '../types';

interface ItemProps {
  product: Product;
}

const Item: React.FC<ItemProps> = ({ product }) => {
  const { id, name, image, price, category, stock } = product;
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      <div className="relative group">
        {imageLoading && (
          <div className="w-full h-56 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Cargando...</div>
          </div>
        )}
        
        {imageError ? (
          <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <ImageOff className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">Imagen no disponible</p>
            </div>
          </div>
        ) : (
          <img 
            src={image} 
            alt={name} 
            className={`w-full h-56 object-cover transform transition-transform duration-300 group-hover:scale-105 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        )}
        
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {stock > 0 ? `Stock: ${stock}` : 'Sin stock'}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-sm font-medium text-primary-700 bg-primary-50 px-3 py-1 rounded-full capitalize">
            {category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 font-display line-clamp-1">
          {name}
        </h3>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${price.toLocaleString()}
          </span>
          <Link 
            to={`/item/${id}`}
            className="btn-secondary flex items-center gap-2 py-2 px-4 text-sm"
          >
            <Eye className="h-4 w-4" />
            <span>Ver detalle</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Item;