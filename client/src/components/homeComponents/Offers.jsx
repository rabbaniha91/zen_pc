import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ShowProduct from "../productComponents/ShowProduct";
import { Swiper } from "swiper";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import "../../assets/styles/offerswiper.css";
const Offers = () => {
  const discountProduct = useSelector((state) => state?.discount?.info);
  const [discount, setDiscount] = useState([]);
  const productBoxRef = useRef(null);

  useEffect(() => {
    setDiscount(discountProduct);
  }, [discountProduct]);
  let swiper = new Swiper(".offer-swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next-offer",
      prevEl: ".swiper-button-prev-offer"
    },
  });

  return (
    <div className=" offer-swiper">
      <div ref={productBoxRef} className="swiper-wrapper swiper-wrapper-offer">
        {discount?.length !== 0 &&
          discount?.map((item, index) => (
            <div key={index} className="swiper-slide swiper-slide-offer">
              <ShowProduct
                id={item?._id}
                offer={item?.offer}
                title={item?.title}
                price={item?.price}
                cover={item?.cover}
              />
            </div>
          ))}
      </div>
      <div className="swiper-button-next-offer">
        <ChevronLeftIcon className="w-7 h-7" />
      </div>
      <div className="swiper-button-prev-offer">
        <ChevronRightIcon className=" w-7 h-7" />
      </div>
    </div>
  );
};

export default Offers;
