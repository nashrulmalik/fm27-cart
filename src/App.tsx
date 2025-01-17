import { useState } from "react";
import data from "./data.json";
import cartLogo from "./assets/icon-add-to-cart.svg";
import addIcon from "./assets/icon-increment-quantity.svg";
import minusIcon from "./assets/icon-decrement-quantity.svg";
import emptyIcon from "./assets/illustration-empty-cart.svg";
import deleteIcon from "./assets/icon-remove-item.svg"
import carbonFree from "./assets/icon-carbon-neutral.svg"

export default function App() {
  const [cart, setCart] = useState(Array(9).fill(0));
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  const handleClick = (id: number) => {
    const newCart = [...cart]; // Create a copy of the previous cart state
    newCart[id] += 1; // Increment the quantity at the specified index
    setCount(count + 1);
    setCart(newCart);

    setTotal(total + data[id].price);
  };

  const handleMin = (id: number) => {
    const newCart = [...cart]; // Create a copy of the previous cart state
    newCart[id] -= 1; // Increment the quantity at the specified index
    setCount(count - 1);
    setCart(newCart);

    setTotal(total - data[id].price);
  };

  const clearItem = () => {
    const newCart = Array(9).fill(0);
    setCart(newCart);
    setCount(0);
    setTotal(0);
  };

  const removeCard = (id: number) => {
    const newCart = [...cart]; // Create a copy of the previous cart state
    setTotal(total - cart[id] * data[id].price);
    setCount(count - cart[id]);
    newCart[id] = 0; // Clear the item
    setCart(newCart);
  };

  return (
    <>
      <main className="p-6 sm:p-10 bg-[#fcf8f6] lg:flex lg:gap-8 lg:items-start lg:justify-center lg:pt-[88px]">
        <section>
          <h1 className="mb-8 text-4xl font-bold">Dessert</h1>

          <div className="sm:grid sm:grid-cols-3 sm:gap-6 sm:gap-y-8 max-w-[800px]">
            {data.map((item, index) => (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center">
                  <picture>
                    <source
                      media="(min-width: 768px)"
                      srcSet={item.image.desktop}
                    />
                    <source
                      media="(min-width: 480px)"
                      srcSet={item.image.tablet}
                    />
                    <img
                      className={`object-cover h-52 lg:h-60 w-[500px] rounded-lg ${
                        cart[index] > 0 ? "border-2 border-orange-700" : ""
                      }`}
                      src={item.image.mobile}
                      alt="Responsive Image"
                    />
                  </picture>

                  {cart[index] === 0 ? (
                    <button
                      onClick={() => handleClick(index)}
                      className="flex items-center justify-center gap-2 w-40 h-11 border border-stone-400 rounded-full -mt-6 bg-white"
                    >
                      <img src={cartLogo} />
                      Add to cart
                    </button>
                  ) : (
                    <div className="flex items-center justify-between gap-2 px-4 w-40 h-11 bg-orange-700 rounded-full -mt-6 text-white">
                      <button
                        onClick={() => handleMin(index)}
                        className="flex items-center justify-center h-5 w-5 border border-white rounded-full"
                      >
                        <img src={minusIcon} />
                      </button>

                      {cart[index]}
                      <button
                        onClick={() => handleClick(index)}
                        className="flex items-center justify-center h-5 w-5 border border-white rounded-full"
                      >
                        <img src={addIcon} />
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
            ))}
          </div>
        </section>

        <div id="cart" className="bg-white p-8 rounded-2xl w-full lg:w-96">
          <h1 className="text-2xl font-bold text-orange-700 mb-6">
            Your Cart ({count})
          </h1>
          <div >
            {count < 1 ? (
              <div className="flex flex-col p-4 g-4 items-center">
                <img src={emptyIcon} alt="empty icon" />
                <p>Your added items will appear here</p>
              </div>
            ) : 
              <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {data.map(
                (item, index) =>
                  cart[index] > 0 && (
                    <>
                      <div className="flex justify-between gap-4 items-center">
                        <div>
                          {item.name}
                          <br/>
                          <div className="flex gap-2">
                          <div className="text-orange-700">x{cart[index]}</div>
                          <div className="text-stone-400">@${data[index].price.toFixed(2)}</div> 
                          <div className="text-amber-900">${(cart[index] * data[index].price).toFixed(2)}</div>
                          </div>
                        </div>

                        <button
                          className="w-5 h-5 border border-stone-400 flex items-center justify-center rounded-full"
                          onClick={() => removeCard(index)}
                        >
                          <img src={deleteIcon} alt="remove item"/>
                        </button>
                      </div>

                      <hr />
                    </>
                  )
              )}
              
              </div>
              <div className="flex justify-between">Order Total <h1 className="text-2xl font-bold">${total.toFixed(2)}</h1></div>
              <div className="flex justify-center items-center bg-[#fcf8f6] h-14 rounded-md gap-2"><img src={carbonFree} alt="carbon free" /><p>This is a <span className="font-medium">carbon-neutral</span> delivery</p></div>
              <button onClick={clearItem} className="h-14 bg-orange-700 flex items-center justify-center text-white rounded-full">Confirm Order</button>
              </div>              
              
            }
          </div>
        </div>
      </main>
    </>
  );
}
