import React, { createContext, useState, useMemo } from "react";

export const CartContext = createContext();

function CartContextprovider({ children }) {
  const [showCart, setshowCart] = useState(false);
  const value = useMemo(
    () => ({
      showCart,
      setshowCart,
    }),
    [showCart, setshowCart]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContextprovider;
