import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import React from "react";

const PopularSection = ({ title, cover }) => {
  return (
    <div className="group popular-section">
      <div
        className="flex  items-start flex-col space-y-5   px-3 py-2
      rounded-lg"
      >
        <span className=" text-xl font-semibold">{title}</span>
        <span className=" font-semibold">مشاهده همه ی موارد</span>
        <span
          className="p-2 flex items-center bg-secondry-bg/50 justify-center   rounded-lg
          transition-all duration-1000 group-hover:bg-ring-color group-hover:scale-105"
        >
          <ChevronLeftIcon className="w-9 h-9 " />
        </span>
      </div>
      <div className=" w-52 h-52">
        <img
          src={`./images/${cover}`}
          alt={title}
          className=" object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default PopularSection;
