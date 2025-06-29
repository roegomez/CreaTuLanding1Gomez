import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, User, Mail, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/firebase';

const CheckoutForm: React.FC = () => {
  const [buyer, setBuyer] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const { cart, clear, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyer({
      ...buyer,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const order = {
      items: cart,
      buyer,
      total: getTotalPrice(),
      date: new Date(),
      status: 'generated'
    };

    try {
      const orderIdGenerated = await createOrder(order);
      setOrderId(orderIdGenerated);
      clear();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error al procesar la orden. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div className="bg-[#f6f6f6] py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">¡Compra realizada!</h2>
              <p className="text-gray-600 mb-6">
                Tu orden ha sido procesada exitosamente.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">ID de tu orden:</p>
                <p className="text-lg font-mono font-bold text-primary-600">{orderId}</p>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Guarda este ID para hacer seguimiento de tu pedido.
              </p>
              <button
                onClick={() => navigate('/')}
                className="btn-secondary"
              >
                Volver a la tienda
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f6f6] py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Finalizar Compra</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen del pedido</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2">
                  <span className="text-gray-700">{item.name} x {item.quantity}</span>
                  <span className="font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total:</span>
                  <span>${getTotalPrice().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={buyer.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ingresa tu nombre completo"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="h-4 w-4 inline mr-2" />
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={buyer.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ingresa tu teléfono"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={buyer.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ingresa tu email"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Procesando...
                </>
              ) : (
                'Confirmar compra'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;