import React from "react";
import { CartContext } from "../../context/CartContext";
import "./Card.scss";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Card({ product }) {
  const user = useSelector( state => state.user)
  const navigate = useNavigate()
  const handleBuyNow = (product, cart, setCart) => {
    let { cartItems } = cart
    if(product.id in cartItems){
      let count = cartItems[product.id].count
      setCart({...cart, showCart: true, cartItems: {...cartItems, [product.id] : {...product, count:count+1}}})
    }
    else{
      cartItems[product.id] = 1
      setCart({...cart, showCart: true, cartItems: {...cartItems, [product.id] : {...product, count: 1}}})
    }
  }
  return (
    <CartContext.Consumer>
      {({ cart, setCart }) => (
        <div className="card__body">
          <h1>{product.name}</h1>
          <div className="card__main">
            <img src={product.imageURL} alt={product.name} />
            <div className="card__desc">
              <p>{product.description}</p>
            </div>
          </div>
          <div className="card__btnContainer">
            <p>MRP. Rs.{product.price}</p>
            <button className="card__btn" onClick={() => user ? handleBuyNow(product,cart, setCart) : navigate('/login')}>
              Buy Now
            </button>
          </div>
          <button className="card__btn-lg">
            Buy Now @ Rs.${product.price}
          </button>
        </div>
      )}
    </CartContext.Consumer>
  );
}

export default Card;
