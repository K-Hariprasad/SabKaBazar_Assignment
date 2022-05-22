import React, { createContext, useState, useMemo } from "react";

export const CartContext = createContext();

function CartContextprovider({ children }) {
  const [cart, setCart] = useState({
    showCart : false,
    cartItems : {}
  });
  const value = useMemo(
    () => ({
      cart,
      setCart,
    }),
    [cart, setCart]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContextprovider;
