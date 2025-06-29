import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import CartItem from './CartItem';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, removeItem, clear, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-[#f6f6f6] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-8">¡Agrega algunos productos para comenzar!</p>
            <Link to="/" className="btn-secondary inline-flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              Ir a comprar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f6f6] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Carrito de Compras</h2>
          <Link to="/" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            Seguir comprando
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="space-y-6 mb-8">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-gray-900">
                Total: ${getTotalPrice().toLocaleString()}
              </span>
              <button
                onClick={clear}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Vaciar carrito
              </button>
            </div>

            <Link
              to="/checkout"
              className="btn-secondary w-full block text-center"
            >
              Proceder al checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;