import React, { useEffect, useRef } from "react";
import { LuShoppingBasket } from "react-icons/lu";
import { MdOutlineEditLocationAlt, MdPayment } from "react-icons/md";
import "../../assets/styles/shoppingprocess.css";

const ShoppingProccess = ({ stage }) => {
  const proccessRef = useRef(null);

  useEffect(() => {
    proccessRef.current.childNodes.forEach((item, index) => {
      if(stage === index + 1){
        item.classList.add("active")
      }
    });
  }, []);
  return (
    <div
      ref={proccessRef}
      className="w-[90%] mx-auto my-10 h-auto py-5 md:py-10 px-5 md:px-2 flex items-center justify-evenly  shopping-process"
    >
      <div className=" flex flex-col md:flex-row items-center justify-center gap-3">
        <LuShoppingBasket className="md:w-7 md:h-7 w-5 h-5" />
        <span className="font-semibold text-sm md:text-lg">سبد خرید</span>
      </div>
      <div className="lg:w-[30%] md:w-[17%] w-[10%] h-[1px] bg-gray-200 mx-5"></div>
      <div className=" flex flex-col md:flex-row items-center justify-center gap-3">
        <MdOutlineEditLocationAlt className="md:w-7 md:h-7 w-5 h-5" />
        <span className="font-semibold text-sm md:text-lg">اطلاعات پرداخت</span>
      </div>
      <div className="lg:w-[30%] md:w-[17%] w-[10%] h-[1px]  bg-gray-200 mx-5"></div>
      <div className=" flex flex-col md:flex-row items-center justify-center gap-3">
        <MdPayment className="md:w-7 md:h-7 w-5 h-5" />
        <span className="font-semibold text-sm md:text-lg">پرداخت</span>
      </div>
    </div>
  );
};

export default ShoppingProccess;
