import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import newAccessTokenAction from "../../redux/actions/newAccessTokenAction";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequiredAuth = () => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location?.state?.from;

  useEffect(() => {
    if (!user?.accessToken) dispatch(newAccessTokenAction());
  }, [dispatch, user?.accessToken]);
  return user?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={`/login`} state={{ from: { pathname } }} />
  );
};

export default RequiredAuth;
