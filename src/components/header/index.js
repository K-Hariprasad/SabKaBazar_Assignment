import React from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ShoppingCartIcon } from "../../assets/icons/cart.svg";
import { CartContext } from "../../context/CartContext";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from '../../redux/actions/userActions';
function Header() {
  const user = useSelector((state) => state.userState.user);
  const cart = useSelector((state) => state.cartState.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCartSelection = (showCart, setshowCart) => {
    user ? setshowCart(!showCart) : navigate("/login");
  };
  return (
    <CartContext.Consumer>
      {({ showCart, setshowCart }) => (
        <header>
          <div className="wrapper">
            <div className="logo">
              <img
                tabIndex={0}
                src={"assets/images/logo.png"}
                alt="Sabkabazar Logo"
                className="logoImg"
              />
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
              <button
                className="cart__btn"
                onClick={() => handleCartSelection(showCart, setshowCart)}
              >
                <ShoppingCartIcon aria-label="cart" height={24} width={24} fill="#d10157" />
                <span>{cart?.length} Item</span>
              </button>
            </div>
          </div>
        </header>
      )}
    </CartContext.Consumer>
  );
}

export default Header;
