import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import ErrorMessage from "../ErrorMessage";
import registerAction from "../../redux/actions/registerAction";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const RegisterForm = ({ setSuccess }) => {
  const register = useSelector((state) => state?.register);
  const dispatch = useDispatch();
  const passRef = useRef(null);
  const eyesRef = useRef(null);
  const [showPass, setShowPass] = useState(false);
  const confirmPassRef = useRef(null);
  const eyesConfirmRef = useRef(null);
  const [showPassConfrim, setShowPassConfirm] = useState(false);

  const languageRegex = /^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیء]+$/;
  const mobileNumberRegex = /^(\+98|0)?9\d{9}$/;
  const passwordRegex = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])/;
  const registerValidation = Yup.object({
    firstName: Yup.string()
      .required("لطفا نام خود را وارد نمایید.")
      .matches(languageRegex, "لطفا از حروف فارسی استفاده کنید.")
      .min(3, "نام باید حداقل سه حرف داشته باشد."),
    lastName: Yup.string()
      .required("لطفا نام خانوادگی خود را وارد نمایید.")
      .matches(languageRegex, "لطفا از حروف فارسی استفاده کنید.")
      .min(3, "نام خانوادگی باید حداقل سه حرف داشته باشد."),
    email: Yup.string()
      .required("لطفا ایمیل خود را وارد نمایید.")
      .email("لطفا آدرس ایمیل معتبر وارد کنید."),
    mobileNumber: Yup.string()
      .required("لطفا شماره تلفن همراه خود را وارد نمایید.")
      .matches(mobileNumberRegex, "لطفا شماره تلفن همراه معتبر وارد کنید."),
    password: Yup.string()
      .required("لطفا رمز عبور خود را وارد نمایید.")
      .min(8, "رمزعبور باید حداقل هشت کاراکتر داشته باشد.")
      .matches(
        passwordRegex,
        "رمزعبور باید دارای حداقل یکی از کاراکترهای خاص باشد."
      ),
    confirmPassword: Yup.string()
      .required("لطفا رمزعبور خود را تایید کنید.")
      .oneOf([Yup.ref("password"), null], "رمزعبور مطابقت ندارد."),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
      term: [],
    },
    validationSchema: registerValidation,
    onSubmit: (values) => {
      dispatch(registerAction(values));
    },
  });
  useEffect(() => {
    if (register.isRegisterd) setSuccess(true);
  }, [register.isRegisterd]);

  useEffect(() => {
    showPass
      ? (passRef.current.type = "text")
      : (passRef.current.type = "password");
  }, [showPass]);
  useEffect(() => {
    showPassConfrim
      ? (confirmPassRef.current.type = "text")
      : (confirmPassRef.current.type = "password");
  }, [showPassConfrim]);

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="register-form-desktop">
        <h3 className="title-form">ثبت نام</h3>
        <div className="register-form">
          <div className="part-form">
            <div className="w-full relative">
              <div className="absolute -top-20">
                {formik.touched.firstName && formik.errors.firstName && (
                  <ErrorMessage
                    message={formik.errors.firstName}
                    position={``}
                    arrowDir={"down"}
                  />
                )}
              </div>
              <input
                id="firstName"
                name="firstName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
                placeholder="نام"
                type="text"
                className="input-form"
              />
            </div>
            <div className="w-full relative">
              <div className="absolute -top-20">
                {formik.touched.lastName && formik.errors.lastName && (
                  <ErrorMessage
                    message={formik.errors.lastName}
                    position={``}
                    arrowDir={"down"}
                  />
                )}
              </div>
              <input
                id="lastName"
                name="lastName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
                placeholder="نام خانوادگی"
                type="text"
                className="input-form"
              />
            </div>

            <div className="w-full relative">
              <div className="absolute -top-20">
                {formik.touched.email && formik.errors.email && (
                  <ErrorMessage
                    message={formik.errors.email}
                    position={``}
                    arrowDir={"down"}
                  />
                )}
              </div>
              <input
                id="email"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="ایمیل"
                type="email"
                className="input-form"
              />
            </div>
            <div className="w-full relative">
              <div className="absolute -top-20">
                {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                  <ErrorMessage
                    message={formik.errors.mobileNumber}
                    position={``}
                    arrowDir={"down"}
                  />
                )}
              </div>
              <input
                id="mobileNumber"
                name="mobileNumber"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.mobileNumber}
                placeholder="شماره همراه"
                type="phone"
                className="input-form"
              />
            </div>
          </div>
          <div className="part-form">
            <div className="w-full relative">
              <div className="absolute -top-20">
                {formik.touched.password && formik.errors.password && (
                  <ErrorMessage
                    message={formik.errors.password}
                    position={``}
                    arrowDir={"down"}
                  />
                )}
              </div>
              <input
                ref={passRef}
                id="password"
                name="password"
                onFocus={() => (eyesRef.current.style.color = "#fff")}
                onBlurCapture={() => (eyesRef.current.style.color = "#191414")}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="رمزعبور"
                type="password"
                className="input-form"
              />
              <span
                ref={eyesRef}
                onClick={() => {
                  setShowPass((prev) => !prev);
                }}
                className=" w-9 h-9 cursor-pointer absolute top-1/2 -translate-y-1/2 translate-x-12"
                style={{ color: "#191414" }}
              >
                {!showPass ? (
                  <VscEye className="w-full h-full" />
                ) : (
                  <VscEyeClosed className="w-full h-full" />
                )}
              </span>
            </div>
            <div className="w-full relative">
              <div className="absolute -top-20">
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <ErrorMessage
                      message={formik.errors.confirmPassword}
                      position={``}
                      arrowDir={"down"}
                    />
                  )}
              </div>
              <input
                ref={confirmPassRef}
                id="confirmPassword"
                name="confirmPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                onFocus={() => (eyesConfirmRef.current.style.color = "#fff")}
                onBlurCapture={() => (eyesConfirmRef.current.style.color = "#191414")}
                value={formik.values.confirmPassword}
                placeholder="تکرار رمز عبور"
                type="password"
                className="input-form"
              />
              <span
                ref={eyesConfirmRef}
                onClick={() => {
                  setShowPassConfirm((prev) => !prev);
                }}
                className=" w-9 h-9 cursor-pointer absolute top-1/2 -translate-y-1/2 translate-x-12"
                style={{ color: "#191414" }}
              >
                {!showPassConfrim ? (
                  <VscEye className="w-full h-full" />
                ) : (
                  <VscEyeClosed className="w-full h-full" />
                )}
              </span>
            </div>

            <div className=" check-rouls">
              <input
                type="checkbox"
                name="term"
                id="term"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <span className=" mr-2">
                <Link
                  to={`/term&privacy`}
                  className=" text-cyan-500 hover:underline"
                >
                  حریم خصوصی{" "}
                </Link>
                را مطالعه کرده و قبول دارم.
              </span>
            </div>
            <button
              type="submit"
              disabled={
                !(
                  formik.dirty &&
                  formik.isValid &&
                  formik.values.term.includes("on")
                )
              }
              className="btn-primery"
            >
              {register.isLoading ? <PulseLoader color="#FFF" /> : "ثبت نام"}
            </button>
          </div>
        </div>
        {register?.errorMessage && (
          <div className="error-message-register">{register?.errorMessage}</div>
        )}
      </form>
    </>
  );
};

export default RegisterForm;
