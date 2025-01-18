// components/ProductCard.tsx
import React from 'react';
import { useCart } from '../context/CartContext';
import cartLogo from '../assets/icon-add-to-cart.svg';
import addIcon from '../assets/icon-increment-quantity.svg';
import minusIcon from '../assets/icon-decrement-quantity.svg';

interface ProductCardProps {
  item: (typeof import('../data.json'))[number];
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, index }) => {
  const { cart, addItem, removeItem } = useCart();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center">
        <picture>
          <source media="(min-width: 768px)" srcSet={item.image.desktop} />
          <source media="(min-width: 480px)" srcSet={item.image.tablet} />
          <img
            className={`object-cover h-52 lg:h-60 w-[500px] rounded-lg ${
              cart[index] > 0 ? 'border-2 border-orange-700' : ''
            }`}
            src={item.image.mobile}
            alt="Product"
          />
        </picture>

        {cart[index] === 0 ? (
          <button
            onClick={() => addItem(index)}
            className="flex items-center justify-center gap-2 w-40 h-11 border border-stone-400 rounded-full -mt-6 bg-white"
          >
            <img src={cartLogo} alt="Add to cart" />
            Add to cart
          </button>
        ) : (
          <div className="flex items-center justify-between gap-2 px-4 w-40 h-11 bg-orange-700 rounded-full -mt-6 text-white">
            <button
              onClick={() => removeItem(index)}
              className="flex items-center justify-center h-5 w-5 border border-white rounded-full"
            >
              <img src={minusIcon} alt="Decrease quantity" />
            </button>

            {cart[index]}
            <button
              onClick={() => addItem(index)}
              className="flex items-center justify-center h-5 w-5 border border-white rounded-full"
            >
              <img src={addIcon} alt="Increase quantity" />
            </button>
          </div>
        )}
      </div>

      <div>
        <span className="text-sm text-stone-500">
          {item.category}
          <br />
        </span>
        <span className="font-semibold text-stone-900">
          {item.name}
          <br />
        </span>
        <span className="text-orange-700">${item.price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ProductCard;