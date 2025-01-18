// App.tsx
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <main className="p-6 sm:p-10 bg-[#fcf8f6] lg:flex lg:gap-8 lg:items-start lg:justify-center lg:pt-[88px]">
        <ProductList />
        <ShoppingCart />
      </main>
    </CartProvider>
  );
}