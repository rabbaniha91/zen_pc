import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import newAccessTokenAction from "../../redux/actions/newAccessTokenAction";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!user?.accessToken){
        dispatch(newAccessTokenAction())
    }
  })
  return <>{<Outlet />}</>;
};

export default PersistLogin;
