import React from "react";
import { Link } from "react-router-dom";
import "./header.styles.css";

import { FiShoppingCart } from "react-icons/fi";

import { connect } from "react-redux";
import {
  selectCartItems,
  selectTotalAmount,
  totalItems,
} from "../../redux/menu/menu.selectors";
import { increment, decrement, remove } from "../../redux/index";

const Header = ({
  cartItems,
  totalAmount,
  totalItems,
  increment,
  decrement,
}) => {
  const [toggleCart, setToggleCart] = React.useState(false);
  return (
    <>
      <div className="header">
        <h2>Hotel</h2>
        <FiShoppingCart
          size={26}
          className="cart-icon"
          onClick={() => setToggleCart(!toggleCart)}
        />
        <div className="cart-total-items">
          <span style={{ fontSize: "11px" }}>{totalItems}</span>
        </div>
      </div>
      {toggleCart ? (
        <div className="cart">
          <>
            {cartItems.length === 0 ? (
              <div className="empty">
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div className="cart-item">
                    <img
                      className="cart-item-image"
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="cart-item-details">
                      <p>{item.name}</p>
                      <p>₹{item.price}</p>
                      <div className="change">
                        <div className="btn" onClick={() => decrement(item.id)}>
                          <p>-</p>
                        </div>
                        <p style={{ marginRight: "4px" }}> {item.quantity}x </p>
                        <div className="btn" onClick={() => increment(item.id)}>
                          <p>+</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {cartItems.length === 0 ? null : (
              <button className="checkout-btn">
                <Link
                  style={{ textDecoration: "none", color: "#fff" }}
                  to="/checkout"
                >
                  Checkout ( ₹{totalAmount} )
                </Link>
              </button>
            )}
          </>
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: selectCartItems(state),
    totalAmount: selectTotalAmount(state),
    totalItems: totalItems(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: (id) => dispatch(increment(id)),
    decrement: (id) => dispatch(decrement(id)),
    remove: (id) => dispatch(remove(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
