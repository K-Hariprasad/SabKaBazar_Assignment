import React from "react";
import { CartContext } from "../../context/CartContext";
import "./Card.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Card({ product, addToCart }) {
  const user = useSelector((state) => state.userState.user);
  const navigate = useNavigate();
  const handleBuyNow = (product, setshowCart) => {
    addToCart(product, "ADD");
    setshowCart(true);
  };
  return (
    <CartContext.Consumer>
      {({ setshowCart }) => (
        <div className="card__body">
          <h1>{product.name}</h1>
          <div className="card__main">
            <img src={product.imageURL} alt={product.name} />
            <div className="card__desc">
              <p>{product.description}</p>
              <button
                className="card__btn-sm"
                onClick={() =>
                  user ? handleBuyNow(product, setshowCart) : navigate("/login")
                }
              >
                Buy Now @ Rs.{product.price}
              </button>
            </div>
          </div>
          <div className="card__btnContainer">
            <p>MRP. Rs.{product.price}</p>
            <button
              className="card__btn"
              onClick={() =>
                user ? handleBuyNow(product, setshowCart) : navigate("/login")
              }
            >
              Buy Now
            </button>
          </div>
          <button
            className="card__btn-lg"
            onClick={() =>
              user ? handleBuyNow(product, setshowCart) : navigate("/login")
            }
          >
            Buy Now @ Rs.{product.price}
          </button>
        </div>
      )}
    </CartContext.Consumer>
  );
}

export default Card;
