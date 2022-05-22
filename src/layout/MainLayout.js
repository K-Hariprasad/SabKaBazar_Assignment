import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import CartContextprovider from "../context/CartContext";
function MainLayout() {
  return (
    <>
      <CartContextprovider>
        <Header />
        <Outlet />
        <Footer />
      </CartContextprovider>
    </>
  );
}

export default MainLayout;
