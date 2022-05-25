import React, { useEffect, useState } from "react";
import Card from "../../components/card";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Products.scss";
import Spinner from "../../components/spinner";
import { CartContext } from "../../context/CartContext";
import Cart from "../../components/cart";
import { useSelector } from "react-redux";
import useCart from "../../hooks/useCart";
import { ReactComponent as ArrowDownIcon } from "../../assets/icons/arrowDown.svg";
import { ReactComponent as ArrowRightIcon } from "../../assets/icons/arrowRight.svg";

function Products() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  let categoryParam = searchParams.get("category");
  const [products, setProducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const user = useSelector((state) => state.userState.user);
  const [cart, addToCart] = useCart(user?.id);

  useEffect(() => {
    window.scroll(0, 0);
    async function fetchData() {
      try {
        setLoading(true);
        const res = await Promise.allSettled([
          axiosInstance.get("products"),
          categories?.length === 0 && axiosInstance.get("categories"),
        ]);
        if (res[0].status === "fulfilled") {
          let products = res[0].value;
          if (categoryParam) {
            products = products.filter(
              (item) => item.category === categoryParam
            );
          }
          setProducts(products);
        }
        if (res[1].status === "fulfilled") {
          let categories = res[1].value.sort((a, b) => {
            return a.order - b.order;
          });
          setcategories(categories);
        }
        if (res[0].status === "rejected") {
          setErrors["products"] = "Products data not available";
        }
        if (res[1].status === "rejected") {
          setErrors["categories"] = "Categories data not available";
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErrors["errorMessage"] = "Something went wrong! Please try again.";
      }
    }
    fetchData();
  }, [categoryParam, categories]);

  const handleCategorySelection = (item) => {
    if (categoryParam) {
      categoryParam !== item.id
        ? navigate(`/products?category=${item.id}`)
        : navigate(`/products`);
    } else {
      navigate(`/products?category=${item.id}`);
    }
  };
  const openMobileCategory = (item) => {
    window.scroll(0, 0);
    setProducts([]);
    handleCategorySelection(item);
    category === item.id ? setCategory("") : setCategory(item.id);
  };
  return (
    <CartContext.Consumer>
      {({ showCart }) => (
        <section className="products__container">
          {showCart && <Cart cartItems={cart} addToCart={addToCart} />}
          {loading && <Spinner />}
          <nav>
            {categories.length > 0 &&
              categories.map((item) => (
                <button
                  className={
                    categoryParam === item.id ? "category-active" : undefined
                  }
                  key={item.id}
                  onClick={() => handleCategorySelection(item)}
                >
                  {item.name}
                </button>
              ))}
          </nav>
          <section className="products__cardContainer">
            {products.length > 0 &&
              products.map((item) => (
                <Card product={item} key={item.id} addToCart={addToCart} />
              ))}
          </section>
          <section className="products__mobile-cardContainer">
            {categories.length > 0 &&
              categories.map((item) => (
                <div key={item.id}>
                  <button className="products__mobile-category" onClick={() => openMobileCategory(item)}>
                    <span>
                      {item.name}
                    </span>
                    {category === item.id?<ArrowDownIcon width="24px" height="24px" fill="#fff" />:
                    <ArrowRightIcon width="24px" height="24px" fill="#fff" />
                    }
                  </button>
                  {category === item.id && (
                    <div>
                      {products.length > 0 &&
                        products.map((ele) => (
                          <Card
                            product={ele}
                            key={ele.id}
                            addToCart={addToCart}
                          />
                        ))}
                    </div>
                  )}
                </div>
              ))}
          </section>
        </section>
      )}
    </CartContext.Consumer>
  );
}

export default Products;
