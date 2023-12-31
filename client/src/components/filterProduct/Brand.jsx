import React from "react";

const Brand = ({ enBrand, faBrand, setBrands }) => {
  return (
    <>
      <label
        htmlFor={enBrand}
        className=" flex items-center justify-between py-1"
      >
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            name={enBrand}
            id={enBrand}
            value={faBrand}
            className="rounded-md focus:ring-0"
            onChange={(e) => {
              if (e.target.checked) {
                setBrands((prev) => {
                  return [...prev, e.target.name.toLocaleLowerCase()];
                });
              } else {
                setBrands((prev) => {
                  return [...prev].filter((brand) => {
                    brand === e.target.name.toLocaleLowerCase();
                  });
                });
              }
            }}
          />
          <span className="text-text-secondry-color font-[200] tracking-tighter">
            {faBrand}
          </span>
        </div>
        <span className=" text-text-secondry-color font-[200] tracking-tighter">
          {enBrand}
        </span>
      </label>
      <div className="w-full m-auto h-[1px] bg-gradient-to-l from-gray-200 via-gray-300 to-gray-200"></div>
    </>
  );
};

export default Brand;
