import React, { useState } from "react";
import Header from "../components/header/Header";
import ShoppingProccess from "../components/shoppings/ShoppingProccess";
import ShoppingCartItems from "../components/shoppings/ShoppingCartItems";
import CheckOutBox from "../components/shoppings/CheckOutBox";

const ShoppingCartPage = () => {
  const [stage, setStage] = useState(1);
  const [reRender, setRerender] = useState(1);

  return (
    <div className="overflow-hidden">
      <Header />
      <div className=" md:mt-[140px] mt-[72px] p-2">
        <ShoppingProccess stage={stage} />
        <div className="flex flex-col lg:flex-row items-start lg:justify-between justify-start">
          <div className="flex flex-col items-center justify-start lg:w-[70%] w-full">
            <ShoppingCartItems setRerender={setRerender} />
          </div>
          <div className="lg:w-[25%] w-full">
            <CheckOutBox reRender={reRender} setRerender={setRerender}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
