import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import ItemDetail from './ItemDetail';
import { getProduct } from '../services/firebase';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { itemId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchProduct = async () => {
      try {
        const productData = await getProduct(itemId);
        setProduct(productData);
      } catch (err) {
        setError('Producto no encontrado');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [itemId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h2>
          <button
            onClick={() => navigate('/')}
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver al catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f6f6] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
        >
          <ArrowLeft className="h-5 w-5" />
          Volver
        </button>

        <ItemDetail {...product} />
      </div>
    </div>
  );
};

export default ItemDetailContainer;