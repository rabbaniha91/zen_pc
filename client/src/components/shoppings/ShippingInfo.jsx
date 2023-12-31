import React, { useEffect, useState, useSyncExternalStore } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { FaLocationCrosshairs } from "react-icons/fa6";
import getShippingInfoAction from "../../redux/actions/getShippingInfoAction";
import { CLEAR_SHIPPING_INFO } from "../../redux/actions/type";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddAdderss from "./AddAdderss";
import EditAdderss from "./EditAddress";
import { deletAddress } from "../../utilities/shoppingCart";

const ShippingInfo = ({ setPostPrice, setIndex }) => {
  const user = useSelector((state) => state?.user);
  const shipping = useSelector((state) => state?.shipping);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate(user);
  const [shippingInfo, setShippingInfo] = useState([]);
  const [enterShipping, setEnterShipping] = useState(false);
  const [editShipping, setEditShipping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState("");
  const [editItem, setEditItem] = useState([])





  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    dispatch(getShippingInfoAction(axiosPrivate, signal));

    return () => {
      dispatch({ type: CLEAR_SHIPPING_INFO });
    };
  }, []);

  useEffect(() => {
    setShippingInfo(shipping?.info);
  }, [shipping]);




  return (
    <div className="w-full flex flex-col py-3 px-4 card-shopping">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <FaLocationCrosshairs className="w-7 h-7" />
          <span>آدرس تحویل سفارش</span>
        </div>
      </div>
      {shippingInfo?.length > 0 &&
        shippingInfo?.map((item, index) => (
          <div
            onClick={() => {
              setCurrentIndex(index)
              setIndex(index)
            }}
            key={index}
            className={`w-full flex items-center justify-between py-3 px-4 ring-1 ring-ring-color 
            mt-2 rounded-lg cursor-pointer transition-colors ${currentIndex === index &&
              "bg-ring-color shadow-lg shadow-green-950"
              }`}
          >
            <div className="leading-7 flex flex-col">
              <span className="font-semibold">
                {item?.firstName + " " + item?.lastName}
              </span>
              <span>{item?.provinceName + " , " + item?.cityName}</span>

              <span>
                {item?.address
                  .split("")
                  .map((i) => {
                    return /[0-9]/.test(i)
                      ? parseInt(i).toLocaleString("fa-IR")
                      : i;
                  })
                  .join("")}
              </span>
            </div>

            <div className="flex items-center justify-between self-end gap-5">
              <button
                onClick={() => {
                  setEditItem(item)
                  setEditShipping(true)
                }}
                className={`btn-primery w-auto px-4 py-2  ${currentIndex === index &&
                  "bg-green-500 hover:bg-green-700 shadow-lg hover:shadow-green-700"
                  }`}
              >
                ویرایش
              </button>
              <button onClick={() => {
                const controller = new AbortController()
                const { signal } = controller;
                deletAddress(axiosPrivate, signal, item?._id).then((data) => setShippingInfo(data))
              }}
                className="btn-primery w-auto px-4 py-2 hover:shadow-red-600 
                bg-red-600 hover:bg-transparent hover:ring-red-700 hover:text-red-800"><TrashIcon className="w-5 h-5" /></button>
            </div>

          </div>
        ))}
      {editShipping && (
        <div
          className="md:w-[60%] xl:w-[80%] w-[99%] h-[90%] overflow-y-auto scrollbar-none  z-50 fixed top-5  left-1/2 py-5
                -translate-x-1/2 bg-[linear-gradient(145deg,_#171212,_#1b1515)] 
                [box-shadow:12px_12px_24px_#0a0808,_-12px_-12px_24px_#282020] rounded-lg"
        >
          <EditAdderss
            setEnterShipping={setEditShipping}
            setShipping={setShippingInfo}
            current={editItem}
          />
        </div>
      )}
      {enterShipping && (
        <div
          className="md:w-[60%] xl:w-[80%] w-[99%] h-[90%] overflow-y-auto scrollbar-none  z-50 fixed top-5  left-1/2 py-5
                -translate-x-1/2 bg-[linear-gradient(145deg,_#171212,_#1b1515)] 
                [box-shadow:12px_12px_24px_#0a0808,_-12px_-12px_24px_#282020] rounded-lg"
        >
          <AddAdderss
            setEnterShipping={setEnterShipping}
            setShipping={setShippingInfo}
          />
        </div>
      )}

      <div
        onClick={() => {
          setEnterShipping(true);
        }}
        className="flex items-center justify-center gap-3 bg-btn-color px-3 py-4 rounded-lg cursor-pointer
           w-[20%] self-end mt-5"
      >
        <span>ثبت آدرس جدید</span>
        <PlusIcon className="w-7 h-7" />
      </div>
    </div>
  );
};

export default ShippingInfo;
