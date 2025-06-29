import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const increment = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAdd = () => {
    onAdd(quantity);
  };

  if (stock === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-red-600 font-medium">Producto sin stock</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={decrement}
          disabled={quantity <= 1}
          className="rounded-full bg-primary-50 p-2 hover:bg-primary-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="h-4 w-4 text-primary-600" />
        </button>
        <span className="text-xl font-medium w-12 text-center">{quantity}</span>
        <button
          onClick={increment}
          disabled={quantity >= stock}
          className="rounded-full bg-primary-50 p-2 hover:bg-primary-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4 text-primary-600" />
        </button>
      </div>
      <button
        onClick={handleAdd}
        className="btn-secondary w-full"
      >
        Agregar al carrito
      </button>
      <p className="text-sm text-gray-500 text-center">
        Stock disponible: {stock}
      </p>
    </div>
  );
};

export default ItemCount;