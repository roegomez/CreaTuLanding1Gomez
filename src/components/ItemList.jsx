import React from 'react';
import Item from './Item';

const ItemList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }}>
          <Item {...product} />
        </div>
      ))}
    </div>
  );
};

export default ItemList;