import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { XMarkIcon } from "@heroicons/react/24/outline";
import LikeAndDisLikeComments from "./LikeAndDisLikeComments";

const Comments = ({ productId, comments }) => {
  const user = useSelector((state) => state?.user);
  const location = useLocation()
  const [isLogin, setIsLogin] = useState(false);
  const [insertComment, setInsertComment] = useState(false);
  const [wrong, setWrong] = useState(false);
  const commentRef = useRef(null);
 const axiosPrivate = useAxiosPrivate(user);

 useEffect(() => {
   const isLoggedIn = user?.accessToken ? true : false;
   setIsLogin(isLoggedIn);
 }, [user?.accessToken]);

  const sendComment = async () => {
    const comment = commentRef.current.value;
    if (comment === "") {
      setWrong(true);
    } else {
      try {
        const response = await axiosPrivate.post("/insertComment", {
          comment,
          productId,
        });
        if (response?.status === 201) {
          commentRef.current.value = "";
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div>
        {insertComment ? (
          <>
            {isLogin ? (
              <div className="flex flex-col justify-center items-start space-y-5 mt-10">
                {wrong && (
                  <div className="py-3 pr-3 pl-10 bg-red-300 rounded-lg text-red-900 font-normal relative">
                    لطفا دیدگاه خود را بنویسید.
                    <XMarkIcon
                      onClick={() => {
                        setWrong(false);
                      }}
                      className=" w-5 h-5 absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer
                     hover:text-red-950"
                    />
                  </div>
                )}
                <textarea
                  ref={commentRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendComment();
                    }
                  }}
                  cols={40}
                  rows={7}
                  className=" border-none focus:ring-[0.5px] focus:ring-gray-700
                   rounded-lg bg-gray-100"
                />

                <div className=" flex items-center justify-start">
                  <button
                    onClick={sendComment}
                    className=" px-5 py-3 ring-1 ring-ring-color bg-btn-color hover:bg-green-950 rounded-md transition-colors "
                  >
                    ثبت
                  </button>
                  <button
                    onClick={() => {
                      setInsertComment(false);
                    }}
                    className=" ring-1 ring-ring-color px-5 py-3 mr-3 rounded-md hover:ring-ring-color/50 transition-colors"
                  >
                    لغو
                  </button>
                </div>
              </div>
            ) : (
              <div>
                برای درج نظر ابتدا باید{" "}
                <Link
                  to="/login"
                  state={{ from: location }}
                  className=" text-cyan-400 hover:underline transition-all"
                >
                  وارد
                </Link>{" "}
                حساب خود شوید و یا{" "}
                <Link
                  to="/register"
                  state={{ from: location }}
                  className=" text-cyan-400 hover:underline transition-all"
                >
                  ثبت نام
                </Link>{" "}
                نمایید.
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => setInsertComment(true)}
            className="px-10 py-3 ring-1 ring-ring-color bg-transparent hover:bg-btn-color transition-colors 
            flex justify-between items-center rounded-md"
          >
            ثبت دیدگاه جدید
            <PlusIcon className=" w-5 h-5" />
          </button>
        )}
      </div>
      <div className=" py-5 flex flex-col space-y-3">
        {comments?.length === 0 ? (
          <div className=" flex flex-col items-center space-y-4">
            <span className=" font-medium">
              دیدگاهی برای این محصول ثبت نشده است.
            </span>
          </div>
        ) : (
          <>
            {comments?.map((item, index) => (
              <div
                className=" flex flex-col w-[90%] md:w-[70%] lg:w-[40%] ring-1 ring-gray-400 p-2 rounded-lg"
                key={index}
              >
                <div className=" flex items-center justify-between border-b-[1px] border-b-gray-400 pb-2">
                  <div className="flex items-center justify-start bg-secondry-bg rounded-lg px-2 py-1 text-text-secondry-color">
                    <span className=" w-9 h-9 bg-gray-100 rounded-full p-1">
                      <img
                        src={item?.commentBy?.picture}
                        alt=""
                        className=" w-full h-full object-fill"
                      />
                    </span>
                    <span className=" mr-3">
                      {item?.commentBy?.firstName +
                        " " +
                        item?.commentBy?.lastName}
                    </span>
                  </div>
                  <div>
                    {new Intl.DateTimeFormat("fa-IR", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(item?.commentAt))}
                  </div>
                </div>
                <div className="p-2">{item?.comment}</div>
                <LikeAndDisLikeComments
                  comment={item}
                  user={user}
                  productId={productId}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Comments;
