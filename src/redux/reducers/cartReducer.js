import { FETCH_CART, UPDATE_CART } from "../actions/actionConstants";
const initialState = {cart : []}
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART:
      return {...state};
    case UPDATE_CART:
      return {...state, cart: action.payload};
    default:
      return {...state};
  }
};
export default cartReducer