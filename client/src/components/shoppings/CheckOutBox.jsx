import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import "../../assets/styles/shoppingcartitems.css";
import { Link } from "react-router-dom";

const CheckOutBox = () => {
  const { cartItems } = useStateContext();
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let total = 0;
    if (cartItems !== null && cartItems?.length > 0) {
      cartItems?.forEach((item) => {
        total += item?.price * item?.count;
      });

      setTotalPrice(total);
    }
  }, [cartItems]);

  return (
    <div className=" flex flex-col items-center justify-between card-shopping p-4">
      <div className=" w-full flex justify-between items-center">
        <span className="text-gray-300"> جمع کل : </span>

        <span className="font-semibold">
          تومان {totalPrice.toLocaleString("fa-IR")}
        </span>
      </div>
      <div className="flex flex-col items-center justify-between w-full space-y-5 mt-8 mb-20">
        <Link to="/" className="btn-secondry">ادامه خرید</Link>
        <Link to="/shipping" className="btn-primery text-center">تایید</Link>
      </div>
    </div>
  );
};

export default CheckOutBox;
