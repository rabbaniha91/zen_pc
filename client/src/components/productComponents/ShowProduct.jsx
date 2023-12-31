import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import "../../assets/styles/productcard.css";

const ShowProduct = ({ offer, title, cover, price, id }) => {
  const toPersianDigits = (str) => {
    let id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return str.replace(/[0-9]/g, function (w) {
      return id[+w];
    });
  };

  const intPrice = price.split(",").join("");
  const discount = (100 - offer) / 100;

  return (
    <div
      className=" product-card group space-y-10 scale-100 hover:scale-105  duration-500 
    transition-all"
    >
      <div className="special ">
        {offer !== 0 && (
          <span className=" text-sm p-1 border-2 border-ring-color self-start rounded-lg">
            پیشنهاد ویژه
          </span>
        )}
      </div>

      <LazyLoadImage
        src={cover}
        effect="blur"
        alt=""
        className=" w-48 h-40 rounded-lg"
      />
      <Link to={`/product/${id}/${title}`} className="show-product-title">
        {title}
      </Link>
      <div className=" flex flex-col">
        {offer !== 0 && (
          <>
            <div className="flex justify-between  items-center">
              <span
                className="bg-btn-color text-gray-100 flex items-center justify-center 
            rounded-lg p-1 ml-24"
              >{`${toPersianDigits(offer.toString())}%`}</span>
              <span className=" font-semibold">
                {toPersianDigits(
                  (intPrice * discount)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                )}{" "}
                تومان
              </span>
            </div>
          </>
        )}
        <span
          className={`self-end  font-semibold mb-[61px]   ${
            offer !== 0 && "line-through text-gray-300 font-thin mt-5 mb-[10px]"
          }`}
        >
          {toPersianDigits(price)} تومان
        </span>
      </div>
    </div>
  );
};

export default ShowProduct;
