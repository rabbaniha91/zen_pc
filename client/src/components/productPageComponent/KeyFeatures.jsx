import React from 'react'

const KeyFeatures = ({keyFeatures}) => {
    
  return (
    <div className="text-text-title-color mt-1.5">
      {keyFeatures?.length > 0 &&
        keyFeatures?.map((item, index) => (
          <div key={index} className=" flex space-x-2">
            <span className="">{item?.title}</span>
            <span> : </span>
            <span className=" text-[16px] text-text-color font-medium">
              {item?.featureValue}
            </span>
          </div>
        ))}
    </div>
  );
}

export default KeyFeatures