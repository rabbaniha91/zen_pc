import React from "react";
import { PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { ImTelegram } from "react-icons/im";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoLinkedin } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";
import { PiYoutubeLogoFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const Footer = ({ dark }) => {
  return (
    <div className="footer-container ">
      <div className=" footer-top relative">
        <Link to={"/"}>
          <img
            src={`/logos/zen-pc-high-resolution-logo-transparent.png`}
            alt=""
            className=" absolute top-2 -right-10 w-36 h-6 "
          />
        </Link>

        <div className="footer-top_items ">
          <span>مرکز تکنولوژی Zen Pc</span>
        </div>
        <div className="footer-top_items">
          <div className="flex mb-3">
            <PhoneIcon className=" w-6 h-6 ml-1" />
            <span>تماس با پشتیبانی</span>
          </div>
          <span>09196163235</span>
        </div>
        <div className=" footer-top_items">
          <div className=" flex mb-3 mt-5 md:mt-0 md:self-start">
            <MapPinIcon className=" w-6 h-6 ml-1" />
            <span>نشانی</span>
          </div>
          <span className=" overflow-clip">
            تهران، تقاطع خیابان ولیعصر و طالقانی، مجتمع تجاری آریا
          </span>
        </div>
      </div>
      <div className=" flex flex-col items-center justify-center space-y-4 mb-4 md:mb-0">
        <span className="font-semibold">
          مار را در شبکه های اجتماعی دنبال کنید.
        </span>
        <div className=" flex space-x-4">
          <Link className=" hover:text-hover-icon transition-colors">
            <ImTelegram className="w-7 h-7 ml-4" />
          </Link>
          <Link className=" hover:text-hover-icon transition-colors">
            <AiFillInstagram className="w-7 h-7" />
          </Link>
          <Link className=" hover:text-hover-icon transition-colors">
            <IoLogoLinkedin className="w-7 h-7" />
          </Link>
          <Link className=" hover:text-hover-icon transition-colors">
            <IoLogoWhatsapp className="w-7 h-7" />
          </Link>
          <Link className=" hover:text-hover-icon transition-colors">
            <PiYoutubeLogoFill className="w-7 h-7" />
          </Link>
        </div>
      </div>
      <div className=" flex items-center justify-center font-semibold">
        Developed by Heydar Rabbaniha
      </div>
    </div>
  );
};

export default Footer;
