import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import ItemCount from './ItemCount';
import { useCart } from '../context/CartContext';

const ItemDetail = ({ id, name, category, description, price, img, stock }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const { addItem } = useCart();

  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity);
    const item = { id, name, price, img };
    addItem(item, quantity);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative group">
          <img
            src={img}
            alt={name}
            className="w-full h-[500px] object-cover"
          />
        </div>

        <div className="p-8">
          <div className="mb-4">
            <span className="text-sm font-medium text-primary-700 bg-primary-50 px-3 py-1 rounded-full">
              {category}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 font-display">{name}</h1>
          <p className="text-gray-600 mb-8">{description}</p>
          
          <div className="mb-8">
            <p className="text-3xl font-bold text-gray-900">${price.toLocaleString()}</p>
          </div>

          <div className="mb-8">
            {quantityAdded > 0 ? (
              <div className="text-center space-y-4">
                <p className="text-green-600 font-medium">
                  ¡Producto agregado al carrito!
                </p>
                <div className="flex gap-4">
                  <Link to="/cart" className="btn-secondary flex-1">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Ir al carrito
                  </Link>
                  <Link to="/" className="btn-primary flex-1">
                    Seguir comprando
                  </Link>
                </div>
              </div>
            ) : (
              <ItemCount stock={stock} initial={1} onAdd={handleOnAdd} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;