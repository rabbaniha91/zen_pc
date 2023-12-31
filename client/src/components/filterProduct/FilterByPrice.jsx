import React, { useEffect, useRef, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const FilterByPrice = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(300000000);
  const minValueRef = useRef(null);
  const maxValueRef = useRef(null);

  const handleRangeInput = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };
  const toPersianDigits = (str) => {
    let id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return str.replace(/[0-9]/g, function (w) {
      return id[+w];
    });
  };
  function onlyNumberKey(str) {
    if (isNaN(parseInt(str[str.length - 1], 10))) {
      return str.slice(0, -1);
    }
    return str;
  }

  useEffect(() => {
    minValueRef.current.value = minValue.toLocaleString("fa-IR");
    maxValueRef.current.value = maxValue.toLocaleString("fa-IR");
  }, [minValue, maxValue]);

  return (
    <div className=" flex flex-col items-center justify-between space-y-8 bg-gray-100 p-3 rounded-lg">
      <div className=" flex flex-col">
        <div className=" flex items-center justify-between w-full">
          <span>از</span>
          <input
            ref={minValueRef}
            type="text"
            inputMode="numeric"
            dir="ltr"
            onChange={(e) => {
              let enNumber = onlyNumberKey(e.target.value)
                .split(",")
                .join("")
                .replace(/[\u0660-\u0669]/g, function (c) {
                  return c.charCodeAt(0) - 0x0660;
                })
                .replace(/[\u06f0-\u06f9]/g, function (c) {
                  return c.charCodeAt(0) - 0x06f0;
                });
              let number = toPersianDigits(
                enNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              );
              e.target.value = number;
            }}
            className="w-[70%] bg-transparent focus:ring-0 border-none"
          />
          <span>تومان</span>
        </div>
        <span className="w-[90%] mx-auto h-[1px] bg-gradient-to-l from-gray-300 via-gray-400 to-gray-300"></span>
      </div>
      <div className=" flex flex-col">
        <div className=" flex items-center justify-between w-full">
          <span>تا</span>
          <input
            ref={maxValueRef}
            type="text"
            inputMode="numeric"
            dir="ltr"
            onChange={(e) => {
              let enNumber = onlyNumberKey(e.target.value)
                .split(",")
                .join("")
                .replace(/[\u0660-\u0669]/g, function (c) {
                  return c.charCodeAt(0) - 0x0660;
                })
                .replace(/[\u06f0-\u06f9]/g, function (c) {
                  return c.charCodeAt(0) - 0x06f0;
                });
              let number = toPersianDigits(
                enNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              );
              e.target.value = number;
            }}
            className="w-[70%] bg-transparent focus:ring-0 border-none"
          />
          <span>تومان</span>
        </div>
        <span className="w-[90%] mx-auto h-[1px] bg-gradient-to-l from-gray-300 via-gray-400 to-gray-300"></span>
      </div>
      <div className="relative w-full">
        <RangeSlider
          min={0}
          max={300000000}
          defaultValue={[0, 300000000]}
          onInput={(event) => {
            setMinValue(event[0]);
            setMaxValue(event[1]);
          }}
        />
      </div>
      <button className="btn-primery">
        فیلتر
      </button>
    </div>
  );
};

export default FilterByPrice;
