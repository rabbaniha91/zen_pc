import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Admin from "./pages/Admin";
import getCategoryAction from "./redux/actions/getCategoryAction";
import Login from "./pages/Login";
import NotAuth from "./components/auth/NotAuth";
import Home from "./pages/Home";
import ProductForm from "./components/admin/ProductForm";
import getDiscountAction from "./redux/actions/getDiscountAction";
import axios from "./axios/axios";
import MainProductsPage from "./pages/MainProductsPage";
import Products from "./pages/Products";
import PersistLogin from "./components/auth/PersistLogin";
import RequiredAuth from "./components/auth/RequiredAuth";
import { register } from "swiper/element/bundle";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import GetShippingDtailes from "./pages/GetShippingDtailes";
import useAxiosPrivate from "./hooks/useAxiosPrivate";

register();

function App() {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate(user);

  useEffect(() => {
    dispatch(getCategoryAction());
    dispatch(getDiscountAction());
  }, [dispatch]);

  useEffect(() => {
    const getSlides = async () => {
      const { data } = await axios.get("/slider");

      localStorage.setItem("slider", JSON.stringify(data));
    };

    getSlides();
  }, []);

  useEffect(() => {
    const loginToPostex = async () => {
      await axiosPrivate.get("/user/logintopostex");
    };
    try {
      loginToPostex();
    } catch (error) {
      console.log("Error :", error);
    }
  }, []);

  

  let slider = localStorage.getItem("slider");
  if (slider) slider = JSON.parse(slider);

  return (
    <Routes>
      <Route element={<NotAuth />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="createproduct" element={<ProductForm />} />
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Home slider={slider} />} />
        <Route
          path={`Products/:title/:subTitles?/:subTitle?/:manufactorer?`}
          element={<MainProductsPage />}
        />
        <Route path={`product/:id/:title`} element={<Products />} />
      </Route>
      <Route element={<RequiredAuth />}>
        <Route path="/shoppingcart" element={<ShoppingCartPage />} />
        <Route path="shipping" element={<GetShippingDtailes />} />
      </Route>
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
