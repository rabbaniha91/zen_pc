import React, { useEffect, useState } from "react";
import { getCartItemsFromLocalStorage } from "../../utilities/shoppingCart";
import ChangeCount from "./ChangeCount";
import "../../assets/styles/shoppingcartitems.css";
import { useStateContext } from "../../context/ContextProvider";

const ShoppingCartItems = ({ setRerender }) => {
  const { cartItems, setCartItems } = useStateContext();

  return (
    <>
      {cartItems !== null && cartItems?.length > 0 && (
        <div className="w-full space-y-5">
          {cartItems?.map((item, index) => (
            <div
              key={index}
              className=" w-full flex items-center justify-between py-3 px-4 card-shopping"
            >
              <div className="flex items-start justify-start gap-5">
                <span>
                  <img src={item?.cover} alt="" className="w-32 h-32" />
                </span>
                <div className="flex flex-col  justify-between leading-9">
                  <span className="mt-5">{item?.title}</span>
                  <span>
                    موجودی انبار : {item?.inventory.toLocaleString("fa-IR")} عدد
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between leading-7">
                <ChangeCount
                  item={item}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  setRerender={setRerender}
                />
                <span className="text-gray-400 mt-3">
                  {item?.price?.toLocaleString("fa-IR")}
                </span>

                <span className="mt-7">
                  {(item?.price * item?.count).toLocaleString("fa-IR")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ShoppingCartItems;
