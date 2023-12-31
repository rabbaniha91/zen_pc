import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useScreenSize from "../../hooks/useScreenSize";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  getCartItemsFromLocalStorage,
  saveCartItemsToLocalStorage,
} from "../../utilities/shoppingCart.js";
import "../../assets/styles/addtocartstyles.css";
import { useStateContext } from "../../context/ContextProvider.jsx";

const AddToCart = ({ price, offer, inventory, items }) => {
  const dispatch = useDispatch();
  const { isMaxXL } = useScreenSize();
  const { setCartLength } = useStateContext();
  const intPrice = parseInt(price?.split(",")?.join(""));
  const discount = (100 - offer) / 100;

  useEffect(() => {
    items.price = intPrice * discount;
    items.inventory = inventory;
  }, [items]);
  const addToCart = () => {
    saveCartItemsToLocalStorage(items);
    setCartLength(getCartItemsFromLocalStorage()?.length);
  };
  return (
    <>
      {!isMaxXL ? (
        <div
          className=" rounded-lg  w-96 flex flex-col items-center  space-y-4 
      px-4 py-4  addtocart relative"
        >
          {inventory === 0 ? (
            <div className=" flex flex-col items-center justify-center space-y-6">
              <span className=" text-xl font-semibold text-gray-500">
                ناموجود
              </span>
              <button className="btn-primery">
                در صورت موجود شدن اطلاع بده
              </button>
            </div>
          ) : (
            <>
              {offer === 0 ? (
                <div className="font-medium text-lg">
                  {intPrice.toLocaleString("fa-IR")} تومان
                </div>
              ) : (
                <div className=" w-full flex flex-col">
                  <div className=" w-full flex items-center justify-between">
                    <span
                      className="bg-btn-color text-gray-100 flex items-center justify-center 
            rounded-lg p-1 ml-24"
                    >{`${offer?.toLocaleString("fa-IR")}%`}</span>
                    <span className=" text-gray-500 line-through">
                      {intPrice.toLocaleString("fa-IR")}
                    </span>
                  </div>
                  <span className=" font-medium text-lg self-center">
                    {(intPrice * discount).toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              )}
              <div></div>
              <div className="w-full flex items-center justify-center">
                <button
                  onClick={addToCart}
                  className="btn-primery  flex items-center justify-center gap-5"
                >
                  اضافه کردن به سبد خرید
                  <PlusIcon className=" w-8 h-8 ring-1 ring-gray-100 text-gray-100  rounded-full p-1" />
                </button>
                <span></span>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className=" fixed flex flex-col space-y-5  bottom-20 sm:bottom-0 px-4 right-0 text-center py-2 bg-gray-200 w-full z-50">
          {offer > 0 && (
            <div className=" flex justify-end gap-5">
              <span
                className="bg-btn-color text-gray-100 flex items-center justify-center 
            rounded-lg p-1 "
              >{`${offer?.toLocaleString("fa-IR")}%`}</span>
              <span className=" text-gray-500 line-through">
                {intPrice.toLocaleString("fa-IR")}
              </span>
            </div>
          )}
          <button
            onClick={() => {
              if (inventory > 0) {
                addToCart();
              }
            }}
            className={`bg-btn-color hover:bg-green-950 rounded-lg shadow-lg py-2 px-6 text-xl flex justify-between
           items-center`}
          >
            {inventory === 0
              ? "ناموجود"
              : `${(intPrice * discount).toLocaleString("fa-IR")}`}
            <PlusIcon className=" w-8 h-8 ring-1 ring-gray-100 text-gray-100  rounded-full p-1" />
          </button>
        </div>
      )}
    </>
  );
};

export default AddToCart;
