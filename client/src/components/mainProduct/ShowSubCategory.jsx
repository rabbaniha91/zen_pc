import React from 'react'
import { Link } from 'react-router-dom'

const ShowSubCategory = ({title, picture}) => {
  return (
    <div
      className=" flex  flex-col items-center justify-around w-auto h-14  lg:w-40 lg:h-48 
       relative group bg-component-bg mb-16 lg:mb-0 rounded-lg shadow-sm shadow-gray-500 
     px-3 lg:px-0 py-2 lg:py-0"
    >
      <div
        className=" lg:w-32 lg:h-32 w-8 h-8 flex items-center justify-center  group-hover:scale-105 
        transition-transform
      duration-700"
      >
        <img
          src={`/images${picture}`}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <span className=" group-hover:text-ring-color transition-all duration-300 text-sm lg:text-lg">
        {title}
      </span>
    </div>
  );
}

export default ShowSubCategory