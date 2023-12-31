import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HeaderCategoryDetails = ({ subTitles, stages }) => {
  const category = useSelector((state) => state.category);
  const titles = category.items?.map((item) => item.title) || [];
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(subTitles[stages]);
  }, [subTitles, stages]);

  
  return (
    <div className=" flex flex-col md:flex-row  md:flex-wrap">
      {titles !== undefined &&
        items?.length > 0 &&
        items?.map((item, index) => (
          <div key={index} className="flex flex-col space-y-2 mr-4">
            <Link
              to={`/products/${titles[stages]}/${item?.title}`}
              className="hover:text-text-hover  cursor-pointer"
            >
              {item?.title}
            </Link>
            {item !== undefined &&
              item?.subTitle !== undefined &&
              item?.subTitle.map((i, j) => (
                <Link
                  to={`/products/${titles[stages]}/${item?.title}/${i?.title}`}
                  className="md:text-[14px] text-[10px] hover:text-text-hover font-normal  
                  cursor-pointer"
                  key={i._id}
                >
                  {i?.title}
                </Link>
              ))}
          </div>
        ))}
    </div>
  );
};

export default HeaderCategoryDetails;
