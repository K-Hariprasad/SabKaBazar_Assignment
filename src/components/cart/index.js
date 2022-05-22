import React from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./Cart.scss";
import CartCard from "./CartCard";
function Cart() {
  const navigate = useNavigate()
  const cartSum = (items) => {
    let sum = Object.keys(items).reduce((acc, curr) => {
      acc += items[curr].count * items[curr].price;
      return acc;
    }, 0);
    return sum;
  };
  return (
    <CartContext.Consumer>
      {({ cart, setCart }) => (
        <main className="cart__main">
          <section className="cart__container">
            <div className="cart__contents">
              <div className="cart__header">
                <h1>My Cart ({Object.keys(cart["cartItems"]).length} item)</h1>
                <button
                  onClick={() => setCart({ ...cart, showCart: !cart.showCart })}
                >
                  X
                </button>
              </div>
              <div className="cart__body">
                {Object.keys(cart["cartItems"]).length > 0 ? (
                  <div>
                  {Object.keys(cart["cartItems"]).map((item) => (
                    <CartCard
                      key={item}
                      item={cart["cartItems"][item]}
                      cart={cart}
                      setCart={setCart}
                    />
                  ))}
                  <div className="cart__lowestPriceTag">
                    <img src={'assets/images/lowest-price.png'} alt="lowest-price-tag"/>
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
              {cartSum(cart.cartItems) > 0 ? (
                <div className="cart__footer">
                  <p>Promo code can be applied on payment page</p>
                  <button className="cart__btn">
                    <span>Proceed to Checkout</span>
                    <span>Rs.{cartSum(cart.cartItems)}</span>
                  </button>
                </div>
              ) : (
                <div className="cart__footer">
                  <button className="cart__btn" style={{justifyContent:'center'}} onClick={()=>{navigate('/products'); setCart({ ...cart, showCart: !cart.showCart })}}>
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
