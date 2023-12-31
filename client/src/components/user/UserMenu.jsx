import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UserIcon,
  HeartIcon,
  ArrowPathRoundedSquareIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import logoutAction from "../../redux/actions/logoutAction";

const UserMenu = () => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate(user)
  const handleLogout = () => {
    dispatch(logoutAction(axiosPrivate))
  }
  return (
    <div className="user-menu">
      <Link to="/profile" className="user-menu-items">
        <span>حساب کاربری</span>
        <span>
          <UserIcon className="icon-size" />
        </span>
      </Link>
      <Link
        to="/favorites
"
        className="user-menu-items"
      >
        <span>علاقه مندی ها</span>
        <span>
          <HeartIcon className="icon-size" />
        </span>
      </Link>
      <Link to="/orders" className="user-menu-items">
        <span>لیست سفارش ها</span>
        <span>
          <ArrowPathRoundedSquareIcon className="icon-size" />
        </span>
      </Link>
      <div onClick={handleLogout} className="user-menu-items">
        <span>خروج</span>
        <span>
          <ArrowLeftOnRectangleIcon className="icon-size" />
        </span>
      </div>
    </div>
  );
};

export default UserMenu;
