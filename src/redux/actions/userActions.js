import { USER_LOGIN, USER_LOGOUT } from './actionConstants'

export const userLogin = (userData) => {
    return {
        type : USER_LOGIN,
        payload : userData
    }
}
export const userLogout = () => {
    return {
        type : USER_LOGOUT,
    }
}