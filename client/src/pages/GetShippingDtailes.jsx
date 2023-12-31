import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import ShoppingProccess from "../components/shoppings/ShoppingProccess";
import CheckOutBox from "../components/shoppings/CheckOutBox";
import ShippingInfo from "../components/shoppings/ShippingInfo";
import { useStateContext } from "../context/ContextProvider";
import { useSelector } from "react-redux";
import {  postPrices } from "../utilities/shoppingCart";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const GetShippingDtailes = () => {
  const user = useSelector(state => state?.user)
  const shipping = useSelector((state) => state?.shipping);
  const axiosPrivate = useAxiosPrivate(user)
  const { cartItems } = useStateContext()
  const [stage, setStage] = useState(3)
  const [postPrice, setPostPrice] = useState(0)
  const [productsId, setProductsId] = useState([])
  const [shippingInfo, setShippingInfo] = useState([]);
  const [currentIndex, setCurrentIndex] = useState("")



  useEffect(() => {
    if (cartItems?.length > 0) {
      cartItems?.map(item => {
        setProductsId(prev => { return [...prev, item?.id] })
      })

      setProductsId(prev => {
        return [...new Set(prev)]
      })
    }
  }, [cartItems])

  useEffect(() => {
    setShippingInfo(shipping?.info);
  }, [shipping]);

  useEffect(() => {

    if (shippingInfo?.length > 0) {
      const formData = { serviceId: 723, city: shippingInfo[currentIndex]?.city, ides: productsId }

      postPrices(axiosPrivate, formData)
        .then(data => { console.log("Data:", data) })
        .catch(err => console.log("Err: ", err))
    }
  }, [currentIndex])

  return (
    <div className="overflow-hidden">
      <Header />
      <div className=" md:mt-[140px] mt-[72px] p-2">
        <ShoppingProccess stage={stage} />
        <div className="flex flex-col lg:flex-row items-start lg:justify-between justify-start ">
          <div className="flex flex-col items-center justify-start lg:w-[70%] w-full">
            <ShippingInfo setPostPrice={setPostPrice} setIndex={setCurrentIndex} />
          </div>
          <div className="lg:w-[25%] w-full">
            <CheckOutBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetShippingDtailes;
