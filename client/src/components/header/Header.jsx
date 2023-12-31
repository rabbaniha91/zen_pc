import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import BLoader from "../ui/BarLoader";
import HeaderCategoryDetails from "./HeaderCategoryDetails";
import useClickOutSide from "../../hooks/useClickOutSide";
import UserMenu from "../user/UserMenu";
import useScreenSize from "../../hooks/useScreenSize";
import HeaderDetails from "./HeaderDetails";
import ShoppingCart from "./ShoppingCart";
import { useStateContext } from "../../context/ContextProvider";
import { CiLogin } from 'react-icons/ci'
import { IoPersonAddOutline } from 'react-icons/io5'
import "../../assets/styles/shoppingcart.css"

const Header = () => {
  const location = useLocation();
  const { isSM } = useScreenSize();
  const [showLoginOption, setShowLoginOption] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [categoryStage, setCategoryStage] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useSelector((state) => state.user);
  const category = useSelector((state) => state?.category);
  const { cartlength } = useStateContext()
  const categoryRef = useRef(null);
  const loginOptionRef = useRef(null);
  const cartItemRef = useRef(null);
  const userMenuRef = useRef(null);
  const navRef = useRef(null);
  const bottomNavRef = useRef(null);

  const titles = category.items?.map((item) => item.title) || [];
  const subTitles = category.items?.map((item) => item.subTitles) || [];

  useClickOutSide(categoryRef, () => {
    setShowCategory(false);
  });
  useClickOutSide(loginOptionRef, () => {
    setShowLoginOption(false);
  });
  useClickOutSide(cartItemRef, () => {
    setShowCart(false);
  });

  useClickOutSide(userMenuRef, () => {
    setShowUserMenu(false);
  });

  const toggleCategory = () => {
    setShowCategory(!showCategory);
    setCategoryStage(0);
  };

  // useEffect(() => {
  //   const shoppingCartItems = getCartItemsFromLocalStorage();
  //   if (shoppingCartItems !== null) {
  //     setCartLength(shoppingCartItems?.length);
  //   }
  // }, []);
  useEffect(() => {
    const checkScroll = () => {
      if (document.documentElement.scrollTop > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    document.addEventListener("scroll", checkScroll);
    return () => {
      document.removeEventListener("scroll", checkScroll);
    };
  }, []);



  useEffect(() => {
    if (!isSM) {
      if (isScrolled) {
        navRef.current.style.height = "70px";
        bottomNavRef.current.classList.add("hidden");
      } else {
        navRef.current.style.height = "132px";
        bottomNavRef.current.classList.remove("hidden");
      }
    }
  }, [isScrolled]);

  return (
    <>
      {user.isLoading && <BLoader />}
      <div id="nav" ref={navRef} className="header">
        <div className="right-header ">
          <div className=" right-header_top ">
            {!isSM && (
              <Link to="/">
                <img
                  className="logo "
                  src={`/logos/zen-pc-high-resolution-logo-transparent.png`}
                  alt="logo"
                />
              </Link>
            )}

            <div className={`search-container `}>
              <input
                type="text"
                placeholder="جستجو"
                className={` searchInput`}
              />
              <span className=" magnify-container">
                <BsSearch className="icons-size" />
              </span>
            </div>
          </div>
          {isSM ? (
            <HeaderDetails />
          ) : (
            <>
              <div
                id="stickyNav"
                ref={bottomNavRef}
                className="right-header-bottom"
              >
                <div
                  ref={categoryRef}
                  onClick={toggleCategory}
                  className="header-items-menu group"
                >
                  <span className="header-icon-container">
                    <Bars3Icon className="icons-size " />
                  </span>
                  <span>دسته بندی</span>

                  {showCategory && (
                    <div className="category-container">
                      {category?.isLoading ? (
                        <span className="loader">
                          <BounceLoader color="#1db954" size={82} />
                        </span>
                      ) : (
                        <div className=" categry">
                          <div className=" categry-right">
                            {titles.map((item, index) => (
                              <Link
                                to={`/products/${item}`}
                                key={index}
                                onMouseMove={() => setCategoryStage(index)}
                                className={`category-titles ${index === categoryStage && "text-text-hover"
                                  }`}
                              >
                                {item}
                              </Link>
                            ))}
                          </div>
                          <div className="px-3">
                            {categoryStage >= 0 && categoryStage <= 5 && (
                              <HeaderCategoryDetails
                                subTitles={subTitles}
                                stages={categoryStage}
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <Link to={`/assemble`} className="header-items-menu group">
                  <span className="header-icon-container">
                    <Squares2X2Icon className="icons-size" />
                  </span>
                  <span>اسمبل هوشمند</span>
                </Link>
                <Link to={`/assemble`} className="header-items-menu group">
                  <span className="header-icon-container">
                    <ArchiveBoxIcon className="icons-size" />
                  </span>
                  <span>جعبه باز</span>
                </Link>
                <Link to={`/assemble`} className="header-items-menu group">
                  <span className="header-icon-container">
                    <EllipsisHorizontalIcon className="icons-size" />
                  </span>
                  <span>درباره ما</span>
                </Link>
              </div>
            </>
          )}
        </div>

        <div className=" left-header">
          {!isSM && (
            <>
              {user?.accessToken ? (
                <div className="md:ml-7 ml-0 relative">
                  <div
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    ref={userMenuRef}
                    className={`user-picture `}
                  >
                    <img
                      src={user?.userInfo?.picture}
                      alt="profile picture"
                      className="w-full h-full object-fill "
                    />
                    {showUserMenu && (
                      <div className="user-menu-container">
                        <UserMenu />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="md:ml-7 ml-0" ref={loginOptionRef}>
                    <span
                      onClick={() => setShowLoginOption((prev) => !prev)}
                      className="left-header-icon"
                    >
                      <UserIcon className="md:w-12 md:h-12 w-8 h-8" />
                    </span>
                    {showLoginOption && (
                      <div className={`login-menu`}>
                        <Link
                          to="/login"
                          state={{ from: location }}
                          className=" login-items"
                        >
                          <span>ورود</span>
                          <span><CiLogin className=" w-6 h-6"/></span>
                        </Link>
                        <Link
                          to="/register"
                          state={{ from: location }}
                          className=" login-items"
                        >
                          <span to="/register">ثبت نام</span>
                          <span><IoPersonAddOutline className=" w-6 h-6"/></span>
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}

          <>
            <div ref={cartItemRef}>
              <span
                onClick={() => setShowCart((prev) => !prev)}
                className=" left-header-icon relative group"
              >
                <ShoppingCartIcon className="md:w-12 md:h-12 w-8 h-8" />
                <span
                  className="bg-green-700 rounded-full absolute -top-3 -right-3 w-9 h-9 flex items-center
                 justify-center group-hover:text-red-700 transition-colors font-semibold"
                >
                  {cartlength !== undefined
                    ? cartlength?.toLocaleString("fa-IR")
                    : "۰"}
                </span>
              </span>
              {showCart && (
                <div className={`shopping-cart`}>
                  <ShoppingCart location={location} />
                </div>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default Header;
