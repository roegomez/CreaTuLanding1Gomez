import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ImageOff } from 'lucide-react';
import ItemCount from './ItemCount';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface ItemDetailProps {
  product: Product;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ product }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const { addItem } = useCart();

  const handleOnAdd = (quantity: number) => {
    console.log('🛒 Adding to cart:', product.name, 'quantity:', quantity);
    setQuantityAdded(quantity);
    addItem(product, quantity);
  };

  const handleImageError = () => {
    console.log('❌ Detail image failed to load:', product.image);
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    console.log('✅ Detail image loaded successfully:', product.image);
    setImageLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative group">
          {imageLoading && (
            <div className="w-full h-[500px] bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-gray-400">Cargando imagen...</div>
            </div>
          )}
          
          {imageError ? (
            <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <ImageOff className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg">Imagen no disponible</p>
                <p className="text-sm mt-2 text-gray-400">Producto ID: {product.id}</p>
              </div>
            </div>
          ) : (
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-[500px] object-cover ${
                imageLoading ? 'opacity-0 absolute' : 'opacity-100'
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
            />
          )}
        </div>

        <div className="p-8">
          <div className="mb-4">
            <span className="text-sm font-medium text-primary-700 bg-primary-50 px-3 py-1 rounded-full capitalize">
              {product.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 font-display">{product.name}</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>
          
          <div className="mb-8">
            <p className="text-3xl font-bold text-gray-900">${product.price.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">Stock disponible: {product.stock} unidades</p>
          </div>

          <div className="mb-8">
            {quantityAdded > 0 ? (
              <div className="text-center space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-700 font-medium">
                    ¡Producto agregado al carrito exitosamente!
                  </p>
                  <p className="text-green-600 text-sm mt-1">
                    Cantidad agregada: {quantityAdded}
                  </p>
                </div>
                <div className="flex gap-4">
                  <Link to="/cart" className="btn-secondary flex-1 flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Ir al carrito
                  </Link>
                  <Link to="/" className="btn-primary flex-1 text-center py-2.5">
                    Seguir comprando
                  </Link>
                </div>
              </div>
            ) : (
              <ItemCount stock={product.stock} initial={1} onAdd={handleOnAdd} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;