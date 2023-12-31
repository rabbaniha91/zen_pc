import React, { useEffect, useState } from "react";
import {
  deleteCart,
  getCartItemsFromLocalStorage,
} from "../../utilities/shoppingCart";
import { useStateContext } from "../../context/ContextProvider";
import { BsCartXFill, BsFillCartCheckFill } from "react-icons/bs";
import "../../assets/styles/shoppingcart.css";
import { Link } from "react-router-dom";
import ChangeCount from "../shoppings/ChangeCount";

const ShoppingCart = () => {
  
  const [rerender, setRerender] = useState(1);
  const { setCartLength, cartItems, setCartItems } = useStateContext();
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const shoppingCartItems = getCartItemsFromLocalStorage();
    if (shoppingCartItems !== null) {
      setCartItems(shoppingCartItems)
    }
  }, []);
 

  useEffect(() => {
    setCartLength(cartItems?.length);
  }, [cartItems]);

  useEffect(() => {
    let total = 0;
    if (cartItems !== null && cartItems?.length > 0) {
      cartItems?.forEach((item) => {
        total += item?.price * item?.count;
      });

      setTotalPrice(total);
    }
  }, [cartItems]);

  const handleDeleteCart = () => {
    deleteCart();
    setCartItems([]);
  };

  return (
    <>
      {cartItems !== null && cartItems?.length > 0 ? (
        <div className="w-full h-full rounded-xl flex items-center justify-center relative pb-24">
          <div
            className="w-full h-full rounded-xl flex flex-col items-center justify-between space-y-5  
          overflow-y-scroll scrollbar-none"
          >
            {cartItems?.length > 0 &&
              cartItems?.map((item, index) => (
                <div key={index} className="cart-items">
                  <div className="w-full flex items-center justify-between">
                    <div className="w-32 h-32">
                      <img
                        src={item?.cover}
                        alt={item?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-[230px] leading-7">
                      <span>{item?.title}</span>
                    </div>
                  </div>
                  <div className=" flex  items-center justify-between ">
                    <span>
                      {(item?.price * item?.count).toLocaleString("fa-IR")}
                    </span>
                    <ChangeCount
                      item={item}
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                      setRerender={setRerender}
                    />
                  </div>
                  <div>
                    <span>موجودی</span>
                    <span> : </span>
                    <span>{item?.inventory.toLocaleString("fa-IR")}</span>
                  </div>
                </div>
              ))}
          </div>
          <div
            className=" absolute w-full rounded-b-xl h-24 bg-component-bg right-0 bottom-0 left-0 
             z-50  rounded-t-sm flex flex-col items-center justify-between px-5 py-2"
          >
            <div className=" text-center">
              <span className=" font-[200]">قیمت کل</span>
              <span> : </span>
              <span>{totalPrice.toLocaleString("fa-IR")}</span>
            </div>
            <div className="w-full flex relative">
              <Link to={"/shoppingcart"} state={{ from: "/shoppingcart" }} className="confrim-link">
                <button className="shopping-cart-btn confirm">
                  <span className="text">تایید سبد خرید</span>
                  <BsFillCartCheckFill className="cart-icons confirm-icon w-7 h-7" />
                </button>
              </Link>
              <button className=" shopping-cart-btn empty">
                <span className="text">خالی کردن سبد خرید</span>
                <BsCartXFill
                  onClick={handleDeleteCart}
                  className="cart-icons trash-icon w-7 h-7 text-red-600"
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className=" empty-cart ">آيتمی يافت نشد!</div>
          <div className=" flex justify-center items-center">
            <img
              className="w-[200px] h-[240px]"
              src="/images/shopping-bag-svgrepo-com.svg"
              alt="basket"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
