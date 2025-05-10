import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { items, addItem, removeItem, clearCart } = useCartStore();
  const navigate = useNavigate();
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    clearCart();
    onClose();
    navigate('/checkout/success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
            <h2 className="text-lg font-semibold text-gray-900">Carrito de Compras</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="h-12 w-12 mb-4" />
                <p>Tu carrito está vacío</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 border-b border-gray-200 pb-4">
                    <img src={item.image} alt={item.name} className="h-20 w-20 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="rounded-full bg-primary-100 p-1 hover:bg-primary-200"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-gray-600">{item.quantity}</span>
                        <button
                          onClick={() => addItem(item)}
                          className="rounded-full bg-primary-100 p-1 hover:bg-primary-200"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-6">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Total</p>
                <p>${total.toLocaleString()}</p>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-secondary-500 py-3 px-4 rounded-full text-white hover:bg-secondary-600 transition-colors duration-200"
              >
                Finalizar Compra
              </button>
              <button
                onClick={clearCart}
                className="w-full mt-2 bg-primary-100 py-3 px-4 rounded-full text-primary-600 hover:bg-primary-200 transition-colors duration-200"
              >
                Vaciar Carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;