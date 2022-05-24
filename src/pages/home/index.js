import React, { useEffect, useState } from "react";
import Banner from "../../components/banner";
import axiosInstance from "../../utils/axiosInstance";
import Spinner from "../../components/spinner";
import { CartContext } from "../../context/CartContext";
import Cart from "../../components/cart";
import { useSelector } from 'react-redux';
import useCart from "../../hooks/useCart";
import Slider from "../../components/slider";
import Alert from "../../components/alert";

function Home() {
  const [banners, setBanner] = useState([]);
  const [categories, setcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const user = useSelector((state) => state.userState.user);
  const [cart, addToCart] = useCart(user?.id)
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await Promise.allSettled([
          axiosInstance.get("categories"),
          axiosInstance.get("banners"),
        ]);
        if (res[0].status === "fulfilled") {
          let categories = res[0].value.sort((a, b) => {
            return a.order - b.order;
          });
          setcategories(categories);
        }
        if (res[1].status === "fulfilled") {
          let banners = res[1].value;
          setBanner(banners);
        }
        if (res[0].status === "rejected") {
          setErrors["categories"] = "categories Data not available";
        }
        if (res[1].status === "rejected") {
          setErrors["banners"] = "Banners Data not available";
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErrors["errorMessage"] = "Something went wrong! Please try again.";
      }
    }
    fetchData();
  }, []);
  return (
    <CartContext.Consumer>
      {({ showCart }) => (
        <section>
          {errors && <Alert message={errors} type={"error"}/>}
          { showCart && <Cart cartItems={cart} addToCart={addToCart}/>}
          {loading && <Spinner />}
          {banners.length > 0 && <Slider sliderContent={banners} />}
          {categories.length > 0 &&
            categories.map((item, key) => (
              <Banner category={item} key={item.id} idx={key} />
            ))}
        </section>
      )}
    </CartContext.Consumer>
  );
}

export default Home;
