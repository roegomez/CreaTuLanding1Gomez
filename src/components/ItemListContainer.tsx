import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import { getProducts, getProductsByCategory } from '../services/firebase';
import { Product } from '../types';
import { Loader2 } from 'lucide-react';

interface ItemListContainerProps {
  greeting: string;
}

const ItemListContainer: React.FC<ItemListContainerProps> = ({ greeting }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      console.log('🚀 ItemListContainer: Starting fetch for categoryId:', categoryId);
      setLoading(true);
      setError(null);

      try {
        let productsData: Product[];
        
        if (categoryId) {
          console.log('🏷️ ItemListContainer: Fetching products for category:', categoryId);
          productsData = await getProductsByCategory(categoryId);
        } else {
          console.log('📦 ItemListContainer: Fetching all products');
          productsData = await getProducts();
        }
        
        console.log('✅ ItemListContainer: Products fetched:', productsData.length);
        console.log('📋 Products data:', productsData.map(p => ({ id: p.id, name: p.name, image: p.image })));
        setProducts(productsData);
      } catch (err) {
        console.error('❌ ItemListContainer: Error fetching products:', err);
        setError('Error al cargar los productos. Por favor, intenta nuevamente.');
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
          {categoryId && (
            <p className="text-sm text-gray-500 mt-2">Categoría: {categoryId}</p>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-secondary"
          >
            Reintentar
          </button>
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
            <p className="text-gray-600 text-lg mb-4">
              {categoryId 
                ? `No hay productos disponibles en la categoría "${categoryId}".`
                : 'No hay productos disponibles.'
              }
            </p>
            <button 
              onClick={() => window.history.back()} 
              className="btn-secondary"
            >
              Volver
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <p className="text-gray-600">
                {categoryId 
                  ? `${products.length} productos encontrados en "${categoryId}"`
                  : `${products.length} productos disponibles`
                }
              </p>
            </div>
            <ItemList products={products} />
          </>
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;