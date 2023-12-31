import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { Link } from "react-router-dom";

import RegisterForm from "../components/authenticate/RegisterForm";
import useScreenSize from "../hooks/useScreenSize";
import RegisterMobileVersion from "../components/authenticate/RegisterMobileVersion";
import Confirm from "../components/authenticate/Confirm";
import { useSelector } from "react-redux";
import Footer from "../components/footer";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const register = useSelector((state) => state?.register);
  const { isSM } = useScreenSize();

  return (
    <>
      <div>
        <Header />
        <div className="form-container">
          <div className="w-52  h-18  mt-5">
            <img
              src={`./logos/zen-pc-high-resolution-logo-transparent.png`}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className=" w-[100%]">
            {!success && (
              <>
                {isSM ? (
                  <RegisterMobileVersion setSuccess={setSuccess} />
                ) : (
                  <div className="register-desktop">
                    <RegisterForm setSuccess={setSuccess} />
                    <span className="lg:w-[30%] w-[22%] h-auto ">
                      <img
                        src="./logos/data-management.png"
                        alt=""
                        className=" w-full h-full object-cover"
                      />
                    </span>
                  </div>
                )}
              </>
            )}

            {success && (
              <div className=" confirm-desktop">
                <Confirm setSuccess={setSuccess} />
                <span>
                  <img
                    src="./logos/cpu.png"
                    alt=""
                    className=" w-full h-full object-cover"
                  />
                </span>
              </div>
            )}
            <div className="py-4 mr-10">
              حساب کاربری دارید؟ از
              <Link to={`/login`} className="text-cyan-500 hover:underline">
                {" "}
                این قسمت وارد شوید.
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
