import { FETCH_CART, UPDATE_CART } from './actionConstants'

export const fetchCart = () => {
    return {
        type : FETCH_CART,
    }
}
export const updateCart = (cart) => {
    return {
        type : UPDATE_CART,
        payload : cart
    }
}