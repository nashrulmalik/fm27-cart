// components/CartItem.tsx
import React from 'react';
import { useCart } from '../context/CartContext';
import deleteIcon from '../assets/icon-remove-item.svg';
import data from '../data.json';

interface CartItemProps {
  index: number;
}

const CartItem: React.FC<CartItemProps> = ({ index }) => {
  const { cart, removeCard } = useCart();
  const item = data[index];

  return (
    <>
      <div className="flex justify-between gap-4 items-center">
        <div>
          {item.name}
          <br />
          <div className="flex gap-2">
            <div className="text-orange-700">x{cart[index]}</div>
            <div className="text-stone-400">@{item.price.toFixed(2)}</div>
            <div className="text-amber-900">
              ${(cart[index] * item.price).toFixed(2)}
            </div>
          </div>
        </div>

        <button
          className="w-5 h-5 border border-stone-400 flex items-center justify-center rounded-full"
          onClick={() => removeCard(index)}
        >
          <img src={deleteIcon} alt="remove item" />
        </button>
      </div>

      <hr />
    </>
  );
};

export default CartItem;