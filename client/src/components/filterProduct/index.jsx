import React, { useRef, useState } from "react";
import FilterByBrand from "./FilterByBrand";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import FilterByPrice from "./filterByPrice";
import Switch from "@mui/material/switch";
import FilterByInventory from "./FilterByInventory";

const Filter = ({setBrands}) => {
  const [showUpIcon, setShowUpIcon] = useState(false);

  const filterByBrandRef = useRef(null);
  const filterByPriceRef = useRef(null)
  const brandRef = useRef(null);
  const priceRef = useRef(null)

  const showOptios = (ref) => {
    ref.classList.toggle("hidden");
    setShowUpIcon(!showUpIcon);
  };
  return (
    <div
      className="w-full py-1 px-2 flex flex-col space-y-3 
      mt-2 h-full"
    >
      <div className="w-full flex flex-col space-y-2">
        <div
          ref={filterByBrandRef}
          onClick={() => {
            showOptios(brandRef.current);
          }}
          className="w-full flex justify-between items-center relative cursor-pointer group pb-3"
        >
          <span className="text-lg">برند</span>
          {showUpIcon ? (
            <ChevronUpIcon className="w-5 h-5 group-hover:scale-105 transition-all" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 group-hover:scale-105 transition-all" />
          )}

          <div className=" underLine"></div>
        </div>
        <div ref={brandRef} className="hidden">
          <FilterByBrand setBrands={setBrands}/>
        </div>
      </div>
      <div className="w-full flex flex-col space-y-2">
        <div
          ref={filterByPriceRef}
          onClick={() => {
            showOptios(priceRef.current);
          }}
          className="w-full flex justify-between items-center relative cursor-pointer group pb-3"
        >
          <span className="text-lg">محدوده ی قیمت</span>
          {showUpIcon ? (
            <ChevronUpIcon className="w-5 h-5 group-hover:scale-105" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 group-hover:scale-105" />
          )}

          <div className=" underLine"></div>
        </div>
        <div ref={priceRef} className="hidden">
          <FilterByPrice />
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex justify-between items-center relative cursor-pointer group pb-3">
          <span className="text-lg">فقط کالاهای موجود</span>
          <Switch
            color="primary"
            onChange={(event) => console.log(event.target.checked)}
          />

          <div className=" underLine"></div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
