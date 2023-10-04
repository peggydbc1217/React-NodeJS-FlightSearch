import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function AppLayout() {
  const loading = useSelector((state) => state.loading?.isLoading) || false;

  return (
    <>
      {loading ? <Loader /> : null}

      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </>
  );
}

export default AppLayout;
