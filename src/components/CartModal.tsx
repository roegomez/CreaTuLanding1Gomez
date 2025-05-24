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
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900">Carrito de Compras</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="h-16 w-16 mb-4 text-gray-400" />
                <p className="text-lg">Tu carrito está vacío</p>
                <p className="text-sm text-gray-400 mt-2">¡Agrega algunos productos!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <img src={item.image} alt={item.name} className="h-24 w-24 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">${item.price}</p>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="rounded-full bg-primary-50 p-1.5 hover:bg-primary-100 transition-colors duration-200"
                        >
                          <Minus className="h-4 w-4 text-primary-600" />
                        </button>
                        <span className="text-gray-700 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => addItem(item)}
                          className="rounded-full bg-primary-50 p-1.5 hover:bg-primary-100 transition-colors duration-200"
                        >
                          <Plus className="h-4 w-4 text-primary-600" />
                        </button>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-6">
              <div className="flex justify-between text-lg font-medium text-gray-900 mb-6">
                <p>Total</p>
                <p className="font-semibold">${total.toLocaleString()}</p>
              </div>
              <button
                onClick={handleCheckout}
                className="btn-secondary w-full mb-3"
              >
                Finalizar Compra
              </button>
              <button
                onClick={clearCart}
                className="w-full py-2.5 px-4 rounded-full text-primary-600 hover:bg-primary-50 transition-colors duration-200"
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