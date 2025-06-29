import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import { getProducts, getProductsByCategory } from '../services/firebase';
import { Loader2 } from 'lucide-react';

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchProducts = async () => {
      try {
        let productsData;
        if (categoryId) {
          productsData = await getProductsByCategory(categoryId);
        } else {
          productsData = await getProducts();
        }
        setProducts(productsData);
      } catch (err) {
        setError('Error al cargar los productos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f6f6] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-900 mb-4 font-serif">
            {categoryId ? `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}` : 'Nuestros Productos'}
          </h2>
          <p className="text-xl text-primary-700 max-w-2xl mx-auto">{greeting}</p>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No hay productos disponibles en esta categoría.</p>
          </div>
        ) : (
          <ItemList products={products} />
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;