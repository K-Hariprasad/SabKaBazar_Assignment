import React from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ShoppingCartIcon } from "../../assets/icons/cart.svg";
import { CartContext } from "../../context/CartContext";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from '../../redux/actions/userActions'
function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCartSelection = (cart, setCart) => {
    user ? setCart({ ...cart, showCart: !cart.showCart }) : navigate("/login");
  };
  return (
    <CartContext.Consumer>
      {({ cart, setCart }) => (
        <header>
          <div className="wrapper">
            <div className="logo">
              <picture>
                <img
                  src={"assets/images/logo.png"}
                  alt="Logo"
                  className="logoImg"
                />
              </picture>
            </div>
            <nav>
              <ul className="nav-list">
                <li className="nav-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/products">Product</Link>
                </li>
              </ul>
            </nav>
            <div>
              {!user ? (
                <ul className="nav-list">
                  <li className="nav-item">
                    <Link to="/login">Sign In</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register">Register</Link>
                  </li>
                </ul>
              ) : (
                <ul className="nav-list">
                  <li className="nav-item">
                    <Link to="/" onClick = {()=>dispatch(userLogout())}>Log out</Link>
                  </li>
                </ul>
              )}
              <div
                className="cart__btn"
                role="button"
                onClick={() => handleCartSelection(cart, setCart)}
              >
                <ShoppingCartIcon height={24} width={24} fill="#d10157" />
                <span>{Object.keys(cart["cartItems"]).length} Item</span>
              </div>
            </div>
          </div>
        </header>
      )}
    </CartContext.Consumer>
  );
}

export default Header;
