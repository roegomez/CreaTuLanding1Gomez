import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PartyPopper } from 'lucide-react';

const CheckoutSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#f6f6f6] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          <PartyPopper className="h-16 w-16 text-secondary-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4 font-display">
          ¡Gracias por tu compra!
        </h1>
        <p className="text-gray-600 mb-6">
          Tu pedido ha sido procesado exitosamente. Recibirás un correo electrónico con los detalles de tu compra.
        </p>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-primary-600 text-white py-3 px-4 rounded-full hover:bg-primary-700 transition-colors duration-200"
        >
          Volver a la tienda
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Serás redirigido automáticamente en 5 segundos...
        </p>
      </div>
    </div>
  );
};

export default CheckoutSuccess;