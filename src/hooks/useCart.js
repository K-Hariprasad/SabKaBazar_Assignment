import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCart } from "../redux/actions/cartActions";
import axiosInstance from "../utils/axiosInstance";
function useCart(userId) {
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchCart();
  }, [userId]);

  const fetchCart = async() => {
    try {
        if(userId){
            const res = await axiosInstance.get(`cart?userId=${userId}`);
            let cartItems = res.filter(e=>e.count >= 1)
            setCart(cartItems);
            dispatch(updateCart(cartItems))
        }
        else{
            setCart([]);
            dispatch(updateCart([]))
        }
    } catch (error) {
      console.log(error.message);
    }
  };

  const addToCart = async(item, action) => {
    let cartIdx = cart.findIndex((e) => e.productId === item.id);
    switch (action) {
      case "ADD":
        if (cartIdx !== -1) {
          let cartObj = { ...cart[cartIdx], count: cart[cartIdx].count + 1 };
          await axiosInstance.put(`cart/${cart[cartIdx].id}`, cartObj);
          fetchCart()
        } else {
          let cartObj = {
            userId,
            productId: item.id,
            item,
            count: 1,
          };
          await axiosInstance.post('cart', cartObj);
          fetchCart()
        }
        break;
      case "REMOVE":
        if (cartIdx !== -1) {
          let cartObj = { ...cart[cartIdx], count: cart[cartIdx].count - 1 };
          await axiosInstance.put(`cart/${cart[cartIdx].id}`, cartObj);
          fetchCart()
        }
        break;
      default:
        break;
    }
  };
  return [cart, addToCart];
}

export default useCart;
