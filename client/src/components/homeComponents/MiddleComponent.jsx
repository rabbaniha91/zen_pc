import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import CustomTooltip from "../Tooltip";

const MiddleComponent = () => {
  return (
    <div className=" middle-componnent-container">
      <div className="middle-component">
        <CustomTooltip title="کامپیوترهای آماده">
          <Link to="/products/کامپیوتر" className=" middle-component-item group">
            <img
              src="./images/MSI-MEG-Trident-X2-13th-1-1500x1500_prev_ui.png"
              alt="کامپیوترهای آماده"
              className=" w-32 h-auto"
            />
            <h3 className=" text-lg font-semibold ">کامپیوترهای آماده</h3>
            <span className=" middle-component-arrow">
              <ChevronLeftIcon className="w-8 h-8" />
            </span>
          </Link>
        </CustomTooltip>
        <CustomTooltip title="لپ تاپ">
          <Link to="/products/لپ تاپ" className=" middle-component-item group">
            <img
              src="./images/Asus-ROG-Zephyrus-M16-2023-1-1500x1500_prev_ui.png"
              alt="لپ تاپ"
              className=" w-32 h-auto"
            />
            <h3 className=" text-xl font-semibold">لپ تاپ</h3>
            <span className=" middle-component-arrow">
              <ChevronLeftIcon className="w-8 h-8" />
            </span>
          </Link>
        </CustomTooltip>
        <CustomTooltip title="کنسول های گیمینگ">
          <Link to="/products/کنسول های گیمینگ" className=" middle-component-item group self-center">
            <img
              src="./images/Sony-PlayStation-5-Marvel’s-Spider-Man-2-Limited-Edition-1500x1500_prev_ui.png"
              alt="کنسول های گیمینگ"
              className=" w-32 h-auto"
            />
            <h3 className=" text-lg font-semibold">کنسول های گیمینگ</h3>
            <span className=" middle-component-arrow">
              <ChevronLeftIcon className="w-8 h-8" />
            </span>
          </Link>
        </CustomTooltip>
      </div>
    </div>
  );
};

export default MiddleComponent;
