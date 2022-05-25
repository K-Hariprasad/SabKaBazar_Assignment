import React from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./Cart.scss";
import CartCard from "./CartCard";

function Cart({ cartItems, addToCart }) {
  const navigate = useNavigate();
  const cartSum = (items) => {
    let sum = Object.keys(items).reduce((acc, curr) => {
      acc += items[curr].count * items[curr].item.price;
      return acc;
    }, 0);
    return sum;
  };
  return (
    <CartContext.Consumer>
      {({ showCart, setshowCart }) => (
        <main className="cart__main">
          <section className="cart__container">
            <div className="cart__contents">
              <div className="cart__header">
                <h1 tabIndex={0}>My Cart ({cartItems.length} item)</h1>
                <button
                  aria-label="close cart"
                  onClick={() => setshowCart(!showCart)}
                >
                  X
                </button>
              </div>
              <div className="cart__body">
                {cartItems.length > 0 ? (
                  <div>
                    {cartItems.map((e) => (
                      <CartCard
                        key={e.id}
                        item={e.item}
                        count={e.count}
                        addToCart={addToCart}
                      />
                    ))}
                    <div className="cart__lowestPriceTag">
                      <img
                        src={"assets/images/lowest-price.png"}
                        alt="lowest-price-tag"
                      />
                      <span>You won't find it cheaper anywhere</span>
                    </div>
                  </div>
                ) : (
                  <div className="cart__empty">
                    <p>No items in your cart</p>
                    <p>Your favourite items are just a click away</p>
                  </div>
                )}
              </div>
              {cartSum(cartItems) > 0 ? (
                <div className="cart__footer">
                  <p>Promo code can be applied on payment page</p>
                  <button className="cart__btn">
                    <span>Proceed to Checkout</span>
                    <span>
                      {`${new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(cartSum(cartItems))}`}
                    </span>
                  </button>
                </div>
              ) : (
                <div className="cart__footer">
                  <button
                    className="cart__btn"
                    style={{ justifyContent: "center" }}
                    onClick={() => {
                      navigate("/products");
                      setshowCart(!showCart);
                    }}
                  >
                    <span>Start shopping</span>
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
      )}
    </CartContext.Consumer>
  );
}

export default Cart;
