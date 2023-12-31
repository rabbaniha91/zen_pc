import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import {
  Bars3Icon,
  Bars3CenterLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { BounceLoader, BarLoader } from "react-spinners";
import BLoader from "../ui/BarLoader";
import HeaderCategoryDetails from "./HeaderCategoryDetails";
import useClickOutSide from "../../hooks/useClickOutSide";
import UserMenu from "../user/UserMenu";
import useScreenSize from "../../hooks/useScreenSize";

const HeaderDetails = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [categoryStage, setCategoryStage] = useState(0);
  const user = useSelector((state) => state.user);
  const category = useSelector((state) => state.category);
  const cartItems = localStorage.getItem("cartItems");
  const categoryRef = useRef(null);
  const loginOptionRef = useRef(null);
  const cartItemRef = useRef(null);
  const userMenuRef = useRef(null);
  const menuRef = useRef(null);
  const categoryTitlesRef = useRef(null);

  const titles = category.items?.map((item) => item.title) || [];
  const subTitles = category.items?.map((item) => item.subTitles) || [];

  useClickOutSide(categoryRef, () => {
    setShowCategory(false);
  });
 
  useClickOutSide(cartItemRef, () => {
    setShowCart(false);
  });

  useClickOutSide(userMenuRef, () => {
    setShowUserMenu(false);
  });
  useClickOutSide(menuRef, () => {
    setMenu(false);
  });

  const toggleCategory = () => {
    setShowCategory(!showCategory);
    setCategoryStage(0);
  };

  useEffect(() => {
    if (showCategory) {
      categoryRef.current.style.width = "65%";
    } else {
      categoryRef.current.style.width = "0";
    }
  }, [showCategory]);

 

  return (
    <>
      <div className="flex" ref={menuRef}>
        <div className="mobile-menu">
          <Link to={`/assemble`} className="menu-items group">
            <span className="">
              <Squares2X2Icon className="w-6  h-6" />
            </span>
            <span className="text-sm font-normal">خانه</span>
          </Link>
          <div onClick={toggleCategory} className="menu-items group">
            <span className=" ">
              <Bars3Icon className="w-6  h-6 " />
            </span>
            <span className="text-sm font-normal">دسته بندی</span>
          </div>
          <Link to={`/assemble`} className="menu-items group">
            <span className="">
              <ArchiveBoxIcon className="w-6  h-6" />
            </span>
            <span className="text-sm font-normal">جعبه باز</span>
          </Link>
          <>
            {user?.accessToken ? (
              <div className="menu-items group">
                <div className={`user-picture `}>
                  <img
                    src={user?.userInfo?.picture}
                    alt="profile picture"
                    className="w-full h-full object-fill "
                  />
                </div>
              </div>
            ) : (
              <>
                <Link to={`/login`} className="menu-items group">
                  <span className="">
                    <UserIcon className="w-6  h-6" />
                  </span>
                  <span className="text-sm font-normal">ورود</span>
                </Link>
              </>
            )}
          </>
        </div>
      </div>

      <div ref={categoryRef} className={`category-container-mobile`}>
        <div className="w-full flex  pr-3 pt-3 overflow-hidden">
          <div className={`category-mobile`}>
            {titles.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setCategoryStage((prevState) =>
                    prevState === index ? null : index
                  );
                }}
              >
                <span
                  to={`/products/${item}`}
                  className={`category-title-mobile ${
                    categoryStage === index ? "text-hover-icon" : ""
                  }`}
                >
                  {item}
                  {categoryStage === index ? (
                    <span className="">
                      <ChevronUpIcon className=" w-5 h-5" />
                    </span>
                  ) : (
                    <span className="">
                      <ChevronDownIcon className=" w-5 h-5" />
                    </span>
                  )}
                </span>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    categoryStage === index ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  <Link to={`products/${item}`} className="text-sm font-normal">
                    مشاهده تمام محصولات این دسته
                  </Link>
                  {subTitles.length > 0 && (
                    <HeaderCategoryDetails
                      subTitles={subTitles}
                      stages={index}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="px-3"></div>
        </div>
      </div>
    </>
  );
};

export default HeaderDetails;
