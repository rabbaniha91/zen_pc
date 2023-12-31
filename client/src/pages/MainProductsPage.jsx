import React, { useCallback, useEffect, useRef, useState } from "react";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import Header from "../components/header/Header";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import getProductsAction from "../redux/actions/getProductsAction";
import { GET_PRODUCTS_CLEAN } from "../redux/actions/type";
import ShowSubCategory from "../components/mainProduct/ShowSubCategory";
import ShowProduct from "../components/productComponents/ShowProduct";
import useScreenSize, { useScreenWidth } from "../hooks/useScreenSize";
import Filter from "../components/filterProduct";
import CustomTooltip from "../components/Tooltip";
import useClickOutSide from "../hooks/useClickOutSide";
import getFilteredProductsByBrandsAction from "../redux/actions/getfilteredProductsByBrandAction";
import Footer from "../components/footer";
import SortProducts from "../components/mainProduct/SortProducts";


const MainProductsPage = ({ dark, setDark }) => {
  const productsInfo = useSelector((state) => state?.products);
  const category = useSelector((state) => state?.category?.items);
  const location = useLocation();
  const dispatch = useDispatch();
  const { isXMD } = useScreenSize();
  const { title, subTitles, subTitle } = useParams();
  const [brands, setBrands] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(9);
  const [pages, setPages] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showFilterSmall, setShowFilterSmall] = useState(false);
  const stickyNavRef = useRef(null);
  const filterMenuRef = useRef(null);
  const pageRef = useRef(null);

  let query = "";
  let level = 1;
  if (subTitle) {
    query = subTitle;
    level = 3;
  } else if (subTitles) {
    query = subTitles;
    level = 2;
  } else {
    query = title;
  }

  useEffect(() => {
    for (let i = 1; i < productsInfo?.totalPages + 1; i++) {
      setPages((prev) => {
        return [...prev, i];
      });
    }

    return () => {
      setPages([]);
    };
  }, [productsInfo?.totalPages]);

  useEffect(() => {
    console.log("Pages: ", pages);
  }, [pages]);

  useEffect(() => {
    const findCategory = category?.find((item) => {
      return item.title === title;
    });
    if (!subTitles) {
      let items = findCategory?.subTitles.map((item) => {
        return {
          picture: item.picture,
          title: item.title,
        };
      });

      setSubCategories(items);
    } else if (!subTitle && subTitles) {
      const findSubCategory = findCategory?.subTitles?.find(
        (item) => item.title === subTitles
      );
      let items = findSubCategory?.subTitle?.map((item) => {
        return {
          picture: item.picture,
          title: item.title,
        };
      });
      setSubCategories(items);
    } else if (subTitle) {
      setSubCategories([]);
    }
  }, [category, title, subTitles, subTitle]);

  useEffect(() => {
    dispatch({ type: GET_PRODUCTS_CLEAN });
    setPageNum(1);
  }, [title, subTitles, subTitle, dispatch]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    if (brands.length > 0) {
      dispatch(
        getFilteredProductsByBrandsAction(
          query,
          level,
          pageNum,
          pageLimit,
          brands,
          signal
        )
      );
    } else {
      dispatch(getProductsAction(query, level, pageNum, pageLimit, signal));
    }

    return () => {
      controller.abort();
    };
  }, [title, subTitles, subTitle, pageNum, brands]);

  useEffect(() => {
    const checkScroll = () => {
      if (stickyNavRef.current) {
        stickyNavRef.current.style.top =
          550 - document.documentElement.scrollTop + "px";
        if (document.documentElement.scrollTop > 550) {
          stickyNavRef.current.style.top = "26px";
        }
      }
    };

    document.addEventListener("scroll", checkScroll);
    return () => {
      document.removeEventListener("scroll", checkScroll);
    };
  }, []);

  useEffect(() => {
    if (screen.width >= useScreenWidth.md) {
      setIsSmallScreen(false);
    } else {
      setIsSmallScreen(true);
    }
  }, [screen.width, isSmallScreen]);

  useEffect(() => {
    if (showFilterSmall) {
      pageRef.current.style.opacity = 0.2;
      filterMenuRef.current.classList.remove("hidden");
    } else {
      pageRef.current.style.opacity = 1;
      filterMenuRef.current.classList.add("hidden");
    }
  }, [showFilterSmall]);

  useClickOutSide(filterMenuRef, () => {
    setShowFilterSmall(false);
  });

  return (
    <div className=" overflow-hidden">
      <Header />
      <div ref={filterMenuRef} className="filter-menu">
        <div className=" font-semibold text-center mb-6 ">فیلتر کالا</div>
        <div className="w-full  h-auto ">
          <Filter setBrands={setBrands} />
        </div>
      </div>
      <div ref={pageRef} className="mt-[140px] px-5 pt-12">
        <div className="text-[14px] ">
          <Link className={`hover:text-hover-icon transition-colors`} to={`/`}>
            فروشگاه ZenPc
          </Link>
          <Link
            className={`hover:text-hover-icon transition-colors`}
            to={`/product/${title}`}
          >
            /{title}
          </Link>
          <Link
            className={`hover:text-hover-icon transition-colors`}
            to={`/products/${title}/${subTitles}`}
          >
            {subTitles && `/${subTitles}`}
          </Link>
          <Link
            to={`/products/${title}/${subTitles}/${subTitle}`}
            className={`hover:text-hover-icon transition-colors`}
          >
            {subTitle && `/${subTitle}`}
          </Link>
        </div>
        <div className=" py-5">
          {subCategories?.length > 0 &&
            subCategories[0]?.title !== undefined && (
              <>
                <span className=" text-lg font-semibold">جستجوی دقیق تر</span>
                <div className=" flex flex-wrap mt-10 gap-5">
                  {subCategories?.map((item, index) => (
                    <Link
                      key={index}
                      to={`${location.pathname}/${item?.title}`}
                    >
                      <ShowSubCategory
                        title={item.title}
                        picture={item.picture}
                      />
                    </Link>
                  ))}
                </div>
              </>
            )}
        </div>

        <div className="lg:w-[95%] sm:w-[85%] w-[98%] mx-auto flex flex-col mt-10 space-y-10 pb-10">
          <div className=" w-full lg:w-[92%] flex justify-between items-center">
            <div>
              {isXMD ? (
                <CustomTooltip title={`فیلتر کالا`}>
                  <div
                    onClick={() => {
                      setShowFilterSmall(true);
                    }}
                    className=" cursor-pointer"
                  >
                    <Bars3BottomRightIcon className=" w-6 h-6 md:w-6 md:h-6" />
                  </div>
                </CustomTooltip>
              ) : (
                <div
                  ref={stickyNavRef}
                  className="w-[240px] h-auto overflow-y-scroll scrollbar-none"
                  style={{
                    position: "fixed",
                    top: subCategories?.length > 0 ? "550px" : "280px",
                    right: "10px",
                    bottom: "10px",
                  }}
                >
                  <div className=" font-semibold mb-12 mr-4">فیلتر کالا</div>
                  <div
                    className="w-full shadow-sm bg-secondry-bg shadow-slate-300 rounded-lg h-auto 
                  text-text-secondry-color"
                  >
                    <Filter setBrands={setBrands} />
                  </div>
                </div>
              )}
            </div>
            <div className=" flex items-start w-full">
              <div className=" flex items-start justify-end gap-5 w-full">
                <SortProducts />
                
                
              </div>
            </div>
          </div>
          <div
            className="lg:mr-[250px] flex w-full items-center lg:justify-start md:justify-center justify-center 
            flex-wrap gap-5 lg:w-[80%] relative"
          >
            {productsInfo?.products?.length > 0 ? (
              productsInfo?.products?.map((item, index) => {
                if (productsInfo?.products?.length === index + 1) {
                  return (
                    <ShowProduct
                      key={index}
                      id={item?._id}
                      offer={item?.offer}
                      title={item?.title}
                      cover={item?.cover}
                      price={item?.price}
                    />
                  );
                } else {
                  return (
                    <ShowProduct
                      id={item?._id}
                      key={index}
                      offer={item?.offer}
                      title={item?.title}
                      cover={item?.cover}
                      price={item?.price}
                    />
                  );
                }
              })
            ) : (
              <div
                className=" w-full h-screen flex items-center justify-center
               font-semibold text-xl"
              >
                محصولی در این دسته موجود نیست.
              </div>
            )}
          </div>
          <div
            dir="ltr"
            className="w-full  flex justify-center items-center space-x-2"
          >
            {pages?.length > 0 &&
              pages.map((page, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setPageNum(page);
                  }}
                  className={`w-8 h-8  cursor-pointer border-none ring-0 text-gray-100 rounded-lg 
                   align-middle self-center text-center hover:bg-btn-color/20 transition-colors ${
                     productsInfo?.nextPage === page + 1
                       ? "bg-disabled-btn"
                       : "bg-btn-color"
                   }`}
                >
                  {page.toLocaleString("fa-IR")}
                </button>
              ))}
          </div>
        </div>
      </div>
      <Footer dark={dark} />
    </div>
  );
};

export default MainProductsPage;
