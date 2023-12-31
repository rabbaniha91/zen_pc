import React, { useMemo, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Brand from "./Brand";
import { laptopBrands } from "../../data/data";
const FilterByBrand = ({setBrands}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBrands = useMemo(() => {
    let isPersian = /^[\u0600-\u06FF\s]+$/;
    let isEnglish = /^[A-Za-z\s]+$/;

    return laptopBrands.filter((brand) => {
      if (isEnglish.test(searchTerm)) {
        return (
          brand.enBrand.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1
        );
      } else if (isPersian.test(searchTerm)) {
        return brand.faBrand.indexOf(searchTerm) > -1;
      } else if (searchTerm === "") {
        return true;
      }
    });
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="flex flex-col space-y-2">
      <div className="relative bg-main-bg/80 text-text-color rounded-lg">
        <input
          type="text"
          placeholder="جستجو"
          className="bg-transparent border-none focus:ring-0"
          onChange={(e) => handleSearch(e)}
        />
        <MagnifyingGlassIcon className="w-5 h-5 absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer" />
      </div>
      <ul
        className="flex flex-col justify-center w-[100%] space-y-2 ring-1 ring-gray-200 bg-gray-100 
       px-2 py-2 rounded-lg h-auto"
      >
        {filteredBrands.map((brand) => (
          <li key={brand.enBrand}>
            <Brand faBrand={brand.faBrand} enBrand={brand.enBrand} setBrands={setBrands}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterByBrand;
