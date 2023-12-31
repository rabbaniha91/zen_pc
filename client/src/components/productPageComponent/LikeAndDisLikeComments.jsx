import React, { useEffect, useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useRefreshToken from "../../hooks/useRefreshToken";
import { XMarkIcon } from "@heroicons/react/24/solid";

const LikeAndDisLikeComments = ({ comment, user, productId }) => {
  const [login, isLogin] = useState(false);
  const [warning, setWarning] = useState(false);
  const [likeCounts, setLikeCounts] = useState(0);
  const [disLikeCounts, setDisLikeCounts] = useState(0);
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate(user);

  useEffect(() => {
    if (user?.accessToken) {
      isLogin(true);
    }
  }, [user?.accessToken]);

  useEffect(() => {
    setLikeCounts(comment?.like?.count);
  }, [comment?.like?.count]);
  useEffect(() => {
    setDisLikeCounts(comment?.disLike?.count);
  }, [comment?.disLike?.count]);

  const handleLike = async () => {
    try {
      const { data } = await axiosPrivate.get(
        `/disLikeComment?productId=${productId}&commentId=${comment?._id}`
      );
      setLikeCounts(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDisLike = async () => {
    try {
      const { data } = await axiosPrivate.get(
        `/likeComment?productId=${productId}&commentId=${comment?._id}`
      );
      setDisLikeCounts(data);
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  };
  return (
    <div className=" relative">
      <div className=" flex items-center justify-end">
        <div className=" flex items-center justify-center space-x-3">
          <BiLike
            onClick={() => {
              if (!login) {
                setWarning(true);
              } else {
                handleLike();
              }
            }}
            className=" w-6 h-6 hover:text-green-700 transition-colors cursor-pointer"
          />
          <span className=" pr-2">{likeCounts.toLocaleString("fa-IR")}</span>
        </div>
        <div className=" flex items-center justify-center space-x-3">
          <BiDislike
          onClick={() => {
            if(!login){
              setWarning(true)
            }else{
              handleDisLike()
            }
          }}
          className=" w-6 h-6 hover:text-red-700 transition-colors cursor-pointer" />
          <span className=" pr-2">{disLikeCounts.toLocaleString("fa-IR")}</span>
        </div>
      </div>
      {warning && (
        <div className="py-3 pr-3 pl-10 bg-red-300/50 rounded-lg text-red-900 font-normal absolute -bottom-10">
          لطفا ابتدا وارد حساب کاربری خود شوید.
          <XMarkIcon
            onClick={() => {
              setWarning(false);
            }}
            className=" w-5 h-5 absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer
                     hover:text-red-950"
          />
        </div>
      )}
    </div>
  );
};

export default LikeAndDisLikeComments;
