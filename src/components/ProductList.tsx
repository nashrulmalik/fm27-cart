// components/ProductList.tsx
import React from 'react';
import data from '../data.json';
import ProductCard from './ProductCard';

const ProductList: React.FC = () => {
  return (
    <section>
      <h1 className="mb-8 text-4xl font-bold">Dessert</h1>

      <div className="sm:grid sm:grid-cols-3 sm:gap-6 sm:gap-y-8 max-w-[800px]">
        {data.map((item, index) => (
          <ProductCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;