import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import ErrorMessage from "../ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { useLocation, useNavigate } from "react-router-dom";
import authAction from "../../redux/actions/authAction";

const Confirm = ({ setSuccess }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let from = location?.state?.from?.pathname || "/";
  const validateCode = Yup.object({
    email: Yup.string()
      .required("لطفا ایمیل خود را وارد نمایید.")
      .email("لطفا آدرس ایمیل معتبر وارد کنید."),
    code: Yup.string()
      .required("لطفا کد ارسال شده به آدرس ایمیل را وارد کنید.")
      .min(8, "کد ۸ کاراکتر است.")
      .max(8, "کد ۸ کاراکتر است."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      code: "",
    },
    validationSchema: validateCode,
    onSubmit: async (values) => {
      dispatch(await authAction(values.email, values.code, from));
    },
  });

  useEffect(() => {
    navigate(user?.path);
  }, [user?.path]);
  return (
    <form onSubmit={formik.handleSubmit} className="confrim-form">
      <h3 className="text-center mr-2 mb-5  font-semibold text-xl">
        تایید آدرس ایمیل
      </h3>
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
          {formik.touched.code && formik.errors.code && (
            <ErrorMessage
              message={formik.errors.code}
              position={``}
              arrowDir={"down"}
            />
          )}
        </div>
        <input
          id="code"
          name="code"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.code}
          placeholder="کد ارسال شده را وارد کنید"
          type="text"
          className="input-form"
        />
      </div>
      <div className=" w-[90%] flex items-center justify-between">
        <button
          type="submit"
          disabled={!(formik.dirty && formik.isValid)}
          className="btn-primery ml-2"
        >
          {user.isLoading ? <PulseLoader color="#FFF" /> : "تایید"}
        </button>
        <button onClick={() => setSuccess(false)} className="btn-secondry">
          قبلی
        </button>
      </div>
      {user?.errorMessage && (
        <div className="text-red-600 text-center">{user?.errorMessage}</div>
      )}
    </form>
  );
};

export default Confirm;
