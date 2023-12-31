import React from "react";
import { Link } from "react-router-dom";

const Category = ({ route, title, cover }) => {
  return (
    <Link
      to={route}
      className=" flex flex-col items-center justify-center rounded-full w-32 h-32 ring-1
     ring-ring-color relative group bg-component-bg/30 shadow-md shadow-ring-color mb-16 lg:mb-0"
    >
      <div
        className=" w-40 h-40 flex items-center justify-center absolute group-hover:scale-105 transition-transform
      duration-700"
      >
        <img
          src={`./images/category/${cover}`}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
    </Link>
  );
};

export default Category;
