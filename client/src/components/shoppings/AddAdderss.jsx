import React, { useEffect, useRef, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import SelectBox from "./SelectBox";
import InputFiled from "./InputFiled";
import useScreenSize from "../../hooks/useScreenSize";
import * as Yup from "yup";
import { useFormik } from "formik";
import ErrorMessage from "../ErrorMessage";
import { MoonLoader } from "react-spinners";
import {
  enterNewAddress,
  getAllStates,
  getCityOfState,
} from "../../utilities/shoppingCart";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";

const AddAdderss = ({ setEnterShipping, setShipping }) => {
  const user = useSelector((state) => state?.user);
  const axiosPrivate = useAxiosPrivate(user);
  const { isXL } = useScreenSize();
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [provinceName, setProvinceName] = useState("");
  const [cityName, setCityName] = useState("");

  const languageRegex = /^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیء]+$/;
  const lettetAndNumRegex = /^[چجحخهعغفقثصضشسیبلاتنمکگ.وئدذرزطظ1234567890 ءپ]+$/
  const mobileNumberRegex = /^(\+98|0)?9\d{9}$/;

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllStates(axiosPrivate, signal).then((data) => {
      setProvinces(data);
      setIsLoading(false);
    });
  }, []);

  const addressFormValidate = Yup.object({
    firstName: Yup.string()
      .required("لطفا نام خود را وارد نمائید.")
      .min(3, "نام باید حداقل 3 حرف باشد.")
      .matches(languageRegex, "لطفا از حروف فارسی استفاده نمائید."),
    lastName: Yup.string()
      .required("لطفا نام خانوادگی خود را وارد نمائید.")
      .min(3, "نام خانوادگی باید حداقل 3 حرف باشد.")
      .matches(languageRegex, "لطفا از حروف فارسی استفاده نمائید."),
    postalCode: Yup.number()
      .required("لطفا کد پستی را وارد نمائید.")
      .min(10, "کد پستی باید ده رقمی باشد."),
    phoneNumber: Yup.string()
      .required("لطفا شماره همراه تحویل گیرنده را وارد نمائید.")
      .matches(mobileNumberRegex, "شماره همراه صحیح نیست."),
    address: Yup.string()
      .required("لطفا آدرس را وارد نمائید.")
      .matches(lettetAndNumRegex, "لطفا آدرس را فارسی وارد نمائید."),
    province: Yup.string().required("لطفا استان را مشخص نمائید."),
    city: Yup.string().required("لطفا نام شهر را مشخص نمائید."),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      postalCode: "",
      phoneNumber: "",
      address: "",
      province: "",
      city: "",
    },

    validationSchema: addressFormValidate,

    onSubmit: (values) => {
      const address = { ...values, provinceName, cityName };
      const controller = new AbortController();
      const { signal } = controller;
      setIsLoading(true);
      enterNewAddress(axiosPrivate, address, signal)
        .then((data) => {
          setShipping((prev) => {
            return [...prev, data];
          });
          setIsLoading(false);
          setEnterShipping(false);
        })
        .catch((err) => console.log(err));
    },
  });

  useEffect(() => {
    if (formik.values.province) {
      const controller = new AbortController();
      const { signal } = controller;
      getCityOfState(axiosPrivate, formik.values.province, signal).then(
        (data) => {
          setCities(data);
          setIsLoading(false);
        }
      );
    }
  }, [formik.values.province]);

  useEffect(() => {
    if (formik.values.province) {
      const current = provinces.find((item) => {
        return item.stateId === formik.values.province;
      });

      setProvinceName(current.stateName);
    }
  }, [formik.values.province]);

  useEffect(() => {
    if (formik.values.city) {
      const current = cities.find((item) => {
        return item.townId === formik.values.city;
      });

      setCityName(current.townName);
    }
  }, [formik.values.city]);

  return (
    <div>
      {isLoading && (
        <div
          className=" w-full h-full absolute inset-0 bg-gray-400/20 flex items-center justify-center"
          style={{ zIndex: 9999 }}
        >
          <MoonLoader color="#1db954" />
        </div>
      )}
      <div>
        <span className="close-icon" style={{ zIndex: 10000 }}>
          <IoCloseCircle
            onClick={() => setEnterShipping(false)}
            className="w-7 h-7"
          />
        </span>
        <form
          className="mt-20 flex flex-col space-y-7 w-[80%]  mx-auto"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col xl:flex-row items-center justify-between space-y-7 xl:space-y-0">
            <div className="relative">
              <div className="absolute -top-20 z-50">
                {formik.dirty &&
                  formik.touched.firstName &&
                  formik.errors.firstName && (
                    <ErrorMessage
                      message={formik.errors.firstName}
                      position={``}
                      arrowDir={"down"}
                    />
                  )}
              </div>
              <InputFiled
                title={`نام`}
                name={`firstName`}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
              />
            </div>
            <div className=" relative">
              <div className="absolute -top-20 z-50">
                {formik.dirty &&
                  formik.touched.lastName &&
                  formik.errors.lastName && (
                    <ErrorMessage
                      message={formik.errors.lastName}
                      position={``}
                      arrowDir={"down"}
                    />
                  )}
              </div>

              <InputFiled
                title={`نام خانوادگی`}
                name={`lastName`}
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
              />
            </div>
          </div>
          <div className="flex flex-col xl:flex-row items-center justify-between space-y-7 xl:space-y-0">
            <div
              className=" relative"
              onClick={() => {
                setIsLoading(true);
              }}
            >
              <div className="absolute -top-20 z-50">
                {formik.touched.province && formik.errors.province && (
                  <ErrorMessage
                    message={formik.errors.province}
                    position={``}
                    arrowDir={"down"}
                  />
                )}
              </div>

              <SelectBox
                list={provinces}
                title={`استان`}
                name={`province`}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.province}
                error={
                  formik.touched.province && Boolean(formik.errors.province)
                }
              />
            </div>
            <div className=" relative">
              <div className="absolute -top-20 z-50">
                {formik.touched.city && formik.errors.city && (
                  <ErrorMessage
                    message={formik.errors.city}
                    position={``}
                    arrowDir={"down"}
                  />
                )}
              </div>
              <SelectBox
                list={cities && cities}
                title={`شهر`}
                name={`city`}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city}
                error={formik.touched.city && Boolean(formik.errors.city)}
              />
            </div>
          </div>
          <div className="flex flex-col xl:flex-row items-center justify-between space-y-7 xl:space-y-0">
            <div className="relative">
              <div className="absolute -top-20 z-50">
                {formik.dirty &&
                  formik.touched.postalCode &&
                  formik.errors.postalCode && (
                    <ErrorMessage
                      message={formik.errors.postalCode}
                      position={``}
                      arrowDir={"down"}
                    />
                  )}
              </div>
              <InputFiled
                title={`کد پستی`}
                name={`postalCode`}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.postalCode}
                error={
                  formik.touched.postalCode && Boolean(formik.errors.postalCode)
                }
              />
            </div>
            <div className=" relative">
              <div className="absolute -top-20 z-50">
                {formik.dirty &&
                  formik.touched.phoneNumber &&
                  formik.errors.phoneNumber && (
                    <ErrorMessage
                      message={formik.errors.phoneNumber}
                      position={``}
                      arrowDir={"down"}
                    />
                  )}
              </div>
              <InputFiled
                title={`شماره همراه`}
                name={`phoneNumber`}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
              />
            </div>
          </div>
          {isXL ? (
            <>
              <div className="w-[400px] xl:w-full mx-auto">
                <div className=" relative">
                  <div className="absolute -top-20 z-50">
                    {formik.dirty &&
                      formik.touched.address &&
                      formik.errors.address && (
                        <ErrorMessage
                          message={formik.errors.address}
                          position={``}
                          arrowDir={"down"}
                        />
                      )}
                  </div>
                  <InputFiled
                    title={`آدرس`}
                    name={`address`}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                  />
                </div>
              </div>
              <div
                className="flex flex-col xl:flex-row items-center justify-between xl:w-full w-[400px] mx-auto
           space-y-7 xl:space-y-0"
              >
                <div className="xl:w-[80%] w-full">
                  <button
                    disabled={!(formik.dirty && formik.isValid)}
                    className="btn-primery w-full disabled:cursor-not-allowed"
                  >
                    ثبت آدرس
                  </button>
                </div>
                <button
                  type="submit"
                  onClick={() => setEnterShipping(false)}
                  className="btn-secondry"
                >
                  لغو
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col xl:flex-row items-center justify-between space-y-7 xl:space-y-0">
                <div className=" relative">
                  <div className="absolute -top-20 z-50">
                    {formik.dirty &&
                      formik.touched.address &&
                      formik.errors.address && (
                        <ErrorMessage
                          message={formik.errors.address}
                          position={``}
                          arrowDir={"down"}
                        />
                      )}
                  </div>
                  <InputFiled
                    title={`آدرس`}
                    name={`address`}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                  />
                </div>
                <div className="xl:w-[80%] w-full">
                  <button
                    disabled={!(formik.dirty && formik.isValid)}
                    type="submit"
                    className="btn-primery w-full disabled:cursor-not-allowed"
                  >
                    ثبت آدرس
                  </button>
                </div>
                <button
                  onClick={() => setEnterShipping(false)}
                  className="btn-secondry"
                >
                  لغو
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddAdderss;
