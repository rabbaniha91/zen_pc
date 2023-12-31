import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import ErrorMessage from "../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import authAction from "../redux/actions/authAction";
import loginAction from "../redux/actions/loginAction";
import Footer from "../components/footer";
import useScreenSize from "../hooks/useScreenSize";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Login = ({ dark, setDark }) => {
  const user = useSelector((state) => state?.user);
  const { isSM } = useScreenSize();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const passRef = useRef(null);
  const eyesRef = useRef(null);
  const [showPass, setShowPass] = useState(false);
  let from = location?.state?.from?.pathname || "/";

  useEffect(() => {
    console.log(from);
  });

  const validateCode = Yup.object({
    email: Yup.string()
      .required("لطفا ایمیل خود را وارد نمایید.")
      .email("لطفا آدرس ایمیل معتبر وارد کنید."),
    password: Yup.string().required("لطفا رمزعبور خود را وارد کنید."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateCode,
    onSubmit: (values) => {
      dispatch(loginAction(values.email, values.password, from));
    },
  });
  useEffect(() => {
    navigate(user?.path);
  }, [user?.path, navigate]);

  useEffect(() => {
    showPass
      ? (passRef.current.type = "text")
      : (passRef.current.type = "password");
  }, [showPass]);
  return (
    <div>
      <Header dark={dark} setDark={setDark} />
      <div className="form-container">
        <div className="w-52  h-18  mt-5">
          <img
            src={`./logos/zen-pc-high-resolution-logo-transparent.png`}
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="login-container">
            <form onSubmit={formik.handleSubmit} className="login-form">
              <h3 className=" title-form">ورود</h3>
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
                  onFocus={() => {
                    eyesRef.current.style.color = "#fff";
                  }}
                  onBlur={formik.handleBlur}
                  onBlurCapture={() => {
                    eyesRef.current.style.color = "#191414";
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="رمز عبور"
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

              <button
                type="submit"
                disabled={!(formik.dirty && formik.isValid)}
                className="btn-primery"
              >
                {user.isLoading ? <PulseLoader color="#FFF" /> : "ورود"}
              </button>

              {user?.errorMessage && (
                <div className="text-red-600 text-center">
                  {user?.errorMessage}
                </div>
              )}
            </form>
            <div className="py-5">
              حساب کاربری ندارید؟ از{" "}
              <Link className=" text-cyan-500 hover:underline" to={`/register`}>
                {" "}
                این قسمت بسازید.
              </Link>
            </div>
          </div>
          {!isSM && (
            <div className="lg:w-[30%] w-[22%] h-auto ">
              <img src="./logos/digital-services.png" alt="" />
            </div>
          )}
        </div>
      </div>
      <Footer dark={dark} />
    </div>
  );
};

export default Login;
