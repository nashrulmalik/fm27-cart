// components/ShoppingCart.tsx
import React from 'react';
import { useCart } from '../context/CartContext';
import emptyIcon from '../assets/illustration-empty-cart.svg';
import carbonFree from '../assets/icon-carbon-neutral.svg';
import CartItem from './CartItem';

const ShoppingCart: React.FC = () => {
  const { cart, total, count, clearItem } = useCart();

  return (
    <div id="cart" className="bg-white p-8 rounded-2xl w-full lg:w-96">
      <h1 className="text-2xl font-bold text-orange-700 mb-6">
        Your Cart ({count})
      </h1>
      <div>
        {count < 1 ? (
          <div className="flex flex-col p-4 g-4 items-center">
            <img src={emptyIcon} alt="empty icon" />
            <p>Your added items will appear here</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {cart.map(
                (quantity, index) => quantity > 0 && <CartItem key={index} index={index} />
              )}
            </div>
            <div className="flex justify-between">
              Order Total{' '}
              <h1 className="text-2xl font-bold">${total.toFixed(2)}</h1>
            </div>
            <div className="flex justify-center items-center bg-[#fcf8f6] h-14 rounded-md gap-2">
              <img src={carbonFree} alt="carbon free" />
              <p>
                This is a <span className="font-medium">carbon-neutral</span> delivery
              </p>
            </div>
            <button
              onClick={clearItem}
              className="h-14 bg-orange-700 flex items-center justify-center text-white rounded-full"
            >
              Confirm Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;