import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import newAccessTokenAction from "../../redux/actions/newAccessTokenAction";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const NotAuth = () => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [from, setFrom] = useState(location?.state?.from?.pathname);
  useEffect(() => {
    if (!user?.accessToken) dispatch(newAccessTokenAction());
  }, [dispatch, user?.accessToken]);
  return user?.accessToken ? <Navigate to={from} /> : <Outlet />;
};

export default NotAuth;
