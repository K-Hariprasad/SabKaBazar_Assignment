import React from "react";

function CartCard({ item, count, addToCart }) {
  return (
    <div className="cartCard__body">
      <img tabIndex={0} src={item.imageURL} alt={item.name} style={{ width: "70px" }} />
      <div className="cartCard__details">
        <p tabIndex={0}>{item.name}</p>
        <div className="cartCard__pricing">
          <div className="cartCard__btnSec">
            <button aria-label="remove item" onClick={() => addToCart(item, "REMOVE")}>-</button>
            <p>{count}</p>
            <button aria-label="add item" onClick={() => addToCart(item, "ADD")}>+</button>
          </div>
          <div>
            <span> X Rs {item.price}</span>
          </div>
          <div>
            <span> Rs {item.price * count}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
