import React, { useEffect, useState } from "react";
import Card from "../../components/card";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Products.scss";
import Spinner from "../../components/spinner";
import { CartContext } from "../../context/CartContext";
import Cart from "../../components/cart";
function Products() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  let categoryParam = searchParams.get("category");
  const [products, setProducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scroll(0,0)
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
    if(categoryParam){
      categoryParam !== item.id ? navigate(`/products?category=${item.id}`) : navigate(`/products`)
    }
    else{
      navigate(`/products?category=${item.id}`)
    }
  };

  return (
    <CartContext.Consumer>
      {({cart}) => (
        <section className="products__container">
          { cart?.showCart && <Cart/>}
          {loading && <Spinner />}
          <aside>
            {categories.length > 0 &&
              categories.map((item) => (
                <h1
                  className={categoryParam === item.id && 'category-active'}
                  role="button"
                  key={item.id}
                  onClick={() => handleCategorySelection(item)}
                >
                  {item.name}
                </h1>
              ))}
          </aside>
          <div className="products__cardContainer">
            {products.length > 0 &&
              products.map((item) => <Card product={item} key={item.id} />)}
          </div>
        </section>
      )}
    </CartContext.Consumer>
  );
}

export default Products;
