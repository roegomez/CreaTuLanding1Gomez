import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ItemListContainerProps {
  greeting: string;
}

const ItemListContainer: React.FC<ItemListContainerProps> = ({ greeting }) => {
  const { categoryId } = useParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = () => {
      if (categoryId) {
        return products.filter(product => 
          product.category.toLowerCase() === categoryId.toLowerCase()
        );
      }
      return products;
    };

    setFilteredProducts(getProducts());
  }, [categoryId]);

  return (
    <div className="bg-[#f6f6f6] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-900 mb-4 font-serif">
            {categoryId ? `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}` : 'Nuestros Productos'}
          </h2>
          <p className="text-xl text-primary-700 max-w-2xl mx-auto">{greeting}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemListContainer;