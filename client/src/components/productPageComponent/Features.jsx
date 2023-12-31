import React, { useState } from "react";
import { RxDoubleArrowDown, RxDoubleArrowUp } from "react-icons/rx";

const Features = ({ titles, features }) => {
  const [slice, setSlice] = useState(1);
  const [showLess, setShowLess] = useState(false);
  return (
    <div className="">
      {titles?.length > 0 &&
        titles?.slice(0, slice)?.map((caption, i) => (
          <div key={i} className=" flex flex-col">
            <h3
              className=" font-semibold text-gray-100 pr-4 rounded-md shadow-lg 
            my-4 bg-[#27353b] py-2 w-[80%] md:w-[50%] lg:w-[30%]"
            >
              {caption}
            </h3>
            <div className="w-full md:w-[80%] lg:w-[45%] md:mr-[100px] py-5">
              {features?.length > 0 &&
                features?.map((item, j) => {
                  if (item?.index == i) {
                    return (
                      <div key={j}>
                        <div className=" w-full relative leading-9">
                          <span className=" text-gray-500">{item?.title}</span>
                          <span className="absolute right-40 md:right-60 font-medium">
                            {item?.featureValue}
                          </span>
                        </div>
                        <div
                          className=" w-[90%] bg-gradient-to-r from-slate-300 via-slate-500 to-slate-300
                         h-[0.5px] py-0.5"
                        ></div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        ))}
      {!showLess ? (
        <div
          className=" flex space-x-2 items-center justify-center cursor-pointer w-[70%] "
          onClick={() => {
            setSlice(titles?.length);
            setShowLess(true);
          }}
        >
          <span>بیشتر</span>
          <RxDoubleArrowDown />
        </div>
      ) : (
        <div
          className=" flex space-x-2 items-center justify-center cursor-pointer w-[70%] "
          onClick={() => {
            setSlice(1);
            setShowLess(false);
          }}
        >
          <span>کمتر</span>
          <RxDoubleArrowUp />
        </div>
      )}
    </div>
  );
};

export default Features;
