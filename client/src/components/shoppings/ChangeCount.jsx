import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import React from 'react'

const ChangeCount = ({ item, cartItems, setCartItems, setRerender }) => {
  const handleDecreaseCartItems = (id) => {
    cartItems.forEach((item) => {
      if (item?.id === id) {
        item.count -= 1;
        return;
      }
    });
    setCartItems(cartItems);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setRerender((prev) => prev + 1);
  };
  const handleIncreaseCartItems = (id) => {
    cartItems.forEach((item) => {
      if (item?.id === id) {
        if (item?.count < item?.inventory) {
          item.count += 1;
        }
        return;
      }
    });
    setCartItems(cartItems);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setRerender((prev) => prev + 1);
  };

  const handleRemoveItem = (id) => {
    const filtredCartItems = cartItems.filter((item) => {
      return item?.id !== id;
    });
    setCartItems(filtredCartItems);
    if (filtredCartItems?.length === 0) {
      localStorage.removeItem("cart");
    } else {
      localStorage.setItem("cart", JSON.stringify(filtredCartItems));
    }
    setRerender((prev) => prev + 1);
  };
  return (
    <>
      <span className="flex items-center gap-2">
        <span>تعداد : </span>
        <span
          className="  px-2 py-1.5 ring-1 ring-ring-color rounded-lg flex items-center justify-center
                     gap-3"
        >
          <PlusIcon
            onClick={() => {
              handleIncreaseCartItems(item?.id);
            }}
            className=" w-5 h-5 cursor-pointer hover:text-hover-icon transition-colors"
          />
          {item?.count.toLocaleString("fa-IR")}

          {item?.count === 1 ? (
            <TrashIcon
              onClick={() => {
                handleRemoveItem(item?.id);
              }}
              className=" w-5 h-5 cursor-pointer hover:text-red-500 transition-colors"
            />
          ) : (
            <MinusIcon
              onClick={() => {
                handleDecreaseCartItems(item?.id);
              }}
              className=" w-5 h-5 cursor-pointer hover:text-red-500 transition-colors"
            />
          )}
        </span>
      </span>
    </>
  );
};

export default ChangeCount