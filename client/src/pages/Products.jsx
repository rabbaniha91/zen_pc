import React, { useEffect, useRef, useState } from "react";
import {
  HeartIcon,
  ShareIcon,
  ShieldCheckIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Header from "../components/header/Header";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import getProductAction from "../redux/actions/getProduct";
import { GET_COMMENTS_CLEAN, GET_PRODUCT_CLEAN } from "../redux/actions/type";
import Footer from "../components/footer";
import BarLoader from "../components/ui/BarLoader";
import ShowPicture from "../components/productPageComponent/ShowPicture";
import { IoCloseCircle } from "react-icons/io5";
import useClickOutSide from "../hooks/useClickOutSide";
import KeyFeatures from "../components/productPageComponent/KeyFeatures";
import AddToCart from "../components/productPageComponent/AddToCart";
import { BiSupport } from "react-icons/bi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturn } from "react-icons/pi";
import Features from "../components/productPageComponent/Features";
import Comments from "../components/productPageComponent/Comments";
import Questions from "../components/productPageComponent/Questions";
import getCommentsAction from "../redux/actions/getCommentsAction";
import useScreenSize from "../hooks/useScreenSize";
import ProductPicture from "../components/productPageComponent/mobileVersion/ProductPicture";
import cartItemsAction from "../redux/actions/cartItemsAction";
import "../assets/styles/card.css";
import "../assets/styles/productpicturemobileversion.css";

const Products = () => {
  const productState = useSelector((state) => state?.product);
  const commentsState = useSelector((state) => state?.commentsInfo);
  const dispatch = useDispatch();
  const { isMD, isMaxXL } = useScreenSize();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [items, setItems] = useState({});
  const [rating, setRating] = useState(0);
  const [numberOfComments, setNumberOfComments] = useState(0);
  const [stage, setStage] = useState(1);
  const showPicture = useRef(null);

  useClickOutSide(showPicture, () => {
    showPicture.current.classList.add("hidden");
  });

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    dispatch(getProductAction(id, signal));

    return () => {
      controller.abort();
      dispatch({ type: GET_PRODUCT_CLEAN });
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    dispatch(getCommentsAction(id, signal));

    return () => {
      controller.abort();
      dispatch({ type: GET_COMMENTS_CLEAN });
    };
  }, []);

  useEffect(() => {
    setProduct(productState?.productInfo);
  }, [productState?.productInfo]);

  useEffect(() => {
    setComments(commentsState?.commentsInfo);
  }, [commentsState?.commentsInfo]);

  useEffect(() => {
    let numbers = 0;
    comments?.map((item) => {
      numbers += item?.comment?.length;
    });

    setNumberOfComments(numbers);
  }, [comments]);

  useEffect(() => {
    if (product?.scores?.length > 0) {
      let score = 0;
      product?.scores?.map((item) => {
        score += item?.score;
      });
      score = score / product?.scores?.length;
      setRating(score);
    }
  }, [product?.scores]);
  useEffect(() => {
    setItems({
      cover: product?.cover,
      title: product?.title,
      id: product?._id,
      count: 1,
    });
  }, [product]);

  return (
    <div className=" overflow-hidden">
      <Header />
      <div className=" md:mt-[140px] mt-[52px]">
        {productState?.isLoading ? (
          <BarLoader />
        ) : (
          <div className="px-1 py-3 flex flex-col xl:flex-row justify-between items-center">
            <div className="flex lg:flex-col flex-row items-center lg:space-y-3 justify-between w-20 self-start">
              <HeartIcon className=" w-7 h-7 cursor-pointer hover:text-hover-icon" />
              <ShareIcon className=" w-7 h-7 cursor-pointer hover:text-hover-icon" />
            </div>
            {isMaxXL ? (
              <div className="product-picture-mobile-version">
                <ProductPicture
                  cover={product?.cover}
                  pictures={product?.pictures}
                />
              </div>
            ) : (
              <>
                <div className=" flex flex-col items-center justify-center">
                  <LazyLoadImage
                    effect="blur"
                    src={product?.cover}
                    alt={product?.title}
                    className=" w-96 h-96 object-cover"
                  />

                  <div className=" flex items-start justify-center w-full">
                    <div
                      onClick={() => {
                        showPicture.current.classList.remove("hidden");
                      }}
                      className="card  cursor-pointer "
                    >
                      <img
                        src={product?.pictures?.[0]}
                        alt={product?.pictures?.[0]}
                        effect="blur"
                        className=" w-36 h-36 object-cover "
                      />
                      <span className="title">نمایش تصاویر</span>
                    </div>
                  </div>

                  <div
                    ref={showPicture}
                    className="hidden  w-[80%] lg:h-[90%] h-[35%] md:h-[40%]  z-50 fixed lg:top-5 top-48 left-1/2 
                -translate-x-1/2 bg-[linear-gradient(145deg,_#171212,_#1b1515)] 
                [box-shadow:12px_12px_24px_#0a0808,_-12px_-12px_24px_#282020] rounded-lg "
                  >
                    <ShowPicture pictures={product?.pictures} />
                    <span
                      onClick={() => {
                        showPicture.current.classList.add("hidden");
                      }}
                      className=" close-icon"
                    >
                      <IoCloseCircle className=" w-7 h-7" />
                    </span>
                  </div>
                </div>
              </>
            )}
            <div className=" xl:w-[45%] w-full flex flex-col space-y-3">
              <div className=" text-2xl font-semibold">{product?.title}</div>
              <div className="text-text-title-color">
                <span>تولید کننده: </span>
                {product?.producer
                  ?.charAt(0)
                  ?.toUpperCase()
                  ?.concat(product?.producer?.slice(1))}
              </div>
              <div className="text-text-title-color">
                مدل کالا: {product?.model}
              </div>
              <div className="text-text-title-color flex flex-col">
                <span className=" flex">
                  <span className=" flex ">
                    {[...Array(5)].map((star, i) => {
                      const rate = i + 1;
                      return (
                        <span key={i} className=" cursor-pointer" id={rate}>
                          <StarIcon
                            className=" w-5 h-5"
                            color={rate <= rating ? "#ffc107" : "#aaa"}
                          />
                        </span>
                      );
                    })}
                  </span>
                  <span>
                    از {product?.scores?.length?.toLocaleString("fa-IR")} رای
                  </span>
                </span>
                <span>{numberOfComments?.toLocaleString("fa-IR")} دیدگاه</span>
              </div>
              <div className="flex flex-col md:flex-row justify-between mt-3 text-text-title-color">
                <div>
                  <span className=" text-lg font-semibold">خصوصیات کلیدی</span>
                  <KeyFeatures keyFeatures={product?.keyFeatures} />
                </div>
              </div>
            </div>
            <div className="self-center ml-2">
              <AddToCart
                price={product?.price}
                offer={product?.offer}
                inventory={product?.inventory}
                items={items}
              />
            </div>
          </div>
        )}
        {isMD && (
          <div className=" flex items-center justify-around my-20">
            <div className=" flex items-center justify-center group">
              <ShieldCheckIcon className=" w-8 h-8 group-hover:text-hover-icon ml-4 transition-colors" />
              <span className=" text-text-color font-thin cursor-default">
                ضمانت اصالت کالا
              </span>
            </div>
            <div className=" flex items-center justify-center group">
              <BiSupport className=" w-8 h-8 group-hover:text-hover-icon ml-4 transition-colors" />
              <span className=" text-text-color font-thin cursor-default">
                پشتیبانی آنلاین
              </span>
            </div>
            <div className=" flex items-center justify-center group">
              <WalletIcon className=" w-8 h-8 group-hover:text-hover-icon ml-4 transition-colors" />
              <span className=" text-text-color font-thin cursor-default">
                پرداخت امن
              </span>
            </div>
            <div className=" flex items-center justify-center group">
              <LiaShippingFastSolid className=" w-8 h-8 group-hover:text-hover-icon ml-4 transition-colors" />
              <span className=" text-text-color font-thin cursor-default">
                ارسال سریع
              </span>
            </div>
            <div className=" flex items-center justify-center group">
              <PiKeyReturn className=" w-8 h-8 group-hover:text-hover-icon ml-4 transition-colors" />
              <span className=" text-text-color font-thin cursor-default">
                امکان بازگشت کالا
              </span>
            </div>
          </div>
        )}
        <div>
          <div className="px-5 flex items-center md:w-[50%] xl:w-[20%] justify-between">
            <span
              onClick={() => {
                setStage(1);
              }}
              className=" cursor-pointer hover:text-[#f69463] transition-colors duration-300"
            >
              خصوصیات
            </span>
            <span
              onClick={() => {
                setStage(2);
              }}
              className=" cursor-pointer hover:text-[#f69463] transition-colors duration-300"
            >
              دیدگاه ها
            </span>
            <span
              onClick={() => {
                setStage(3);
              }}
              className=" cursor-pointer hover:text-[#f69463] transition-colors duration-300"
            >
              سوال ها
            </span>
          </div>
          <div className="w-[98%] mx-auto rounded-xl h-1 bg-gray-700 my-2"></div>
          <div className=" pr-5">
            {stage === 1 ? (
              <Features
                titles={product?.featuresTitle}
                features={product?.featuresValue}
              />
            ) : stage === 2 ? (
              <Comments productId={product?._id} comments={comments} />
            ) : (
              <Questions />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
