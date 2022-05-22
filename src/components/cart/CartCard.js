import React from "react";

function CartCard({ item, cart, setCart }) {
  const handleCount = (type, item) => {
    let { cartItems } = cart;
    let count = cartItems[item.id].count;
    if (type === "remove") {
      if (item.count === 1) {
        delete cartItems[item.id];
        setCart({ ...cart, cartItems });
      } else {
        setCart({
          ...cart,
          cartItems: {
            ...cartItems,
            [item.id]: { ...item, count: count - 1 },
          },
        });
      }
    } else if (type === "add") {
      setCart({
        ...cart,
        cartItems: {
          ...cartItems,
          [item.id]: { ...item, count: count + 1 },
        },
      });
    }
  };
  return (
    <div className="cartCard__body">
      <img src={item.imageURL} alt={item.name} style={{ width: "70px" }} />
      <div className="cartCard__details">
        <p>{item.name}</p>
        <div className="cartCard__pricing">
          <div className="cartCard__btnSec">
            <button onClick={() => handleCount("remove", item)}>-</button>
            <p>{item.count}</p>
            <button onClick={() => handleCount("add", item)}>+</button>
          </div>
          <div>
            <span> X Rs.{item.price}</span>
          </div>
          <div>
            <span> Rs.{item.price * item.count}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
