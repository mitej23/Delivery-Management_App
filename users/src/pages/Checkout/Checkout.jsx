import React from "react";
import "./Checkout.styles.css";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import {
  selectCartItems,
  selectTotalAmount,
  totalItems,
} from "../../redux/menu/menu.selectors";
import { increment, decrement, remove } from "../../redux/index";

const Checkout = ({
  cartItems,
  totalAmount,

  increment,
  decrement,
}) => {
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const history = useHistory();

  const submit = () => {
    if (name.length === 0 || address.length === 0 || mobile.length === 0) {
      alert("Enter missing inputs");
      return;
    }
    console.log(name, address, mobile);
    history.push("/");
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="form">
          <h1 className="head">Checkout</h1>
          <p className="form-header">Shipping Details</p>
          <p className="note">** Note: It will use the current location.</p>
          <p className="title">Name</p>
          <input
            className="input-box"
            type="text"
            onChange={(input) => setName(input.target.value)}
          />
          <p className="title">Address</p>
          <input
            className="input-box address"
            type="text"
            onChange={(input) => setAddress(input.target.value)}
          />
          <p className="title">Mobile No</p>
          <input
            className="input-box"
            type="tel"
            onChange={(input) => setMobile(input.target.value)}
          />
        </div>
        <hr />
        <div className="orders-details">
          <p className="form-header order-head">Order Details</p>
          <div className="orders">
            {cartItems.map((item, index) => {
              return (
                <div className="order">
                  <div className="order-details">
                    <p className="name">{item.name}</p>
                    <p className="price">₹{item.price}</p>
                    <div className="change">
                      <div
                        className="check-btn"
                        onClick={() => decrement(item.id)}
                      >
                        <p>-</p>
                      </div>
                      <p style={{ marginRight: "4px" }}> {item.quantity}x </p>
                      <div
                        className="check-btn"
                        onClick={() => increment(item.id)}
                      >
                        <p>+</p>
                      </div>
                    </div>
                  </div>
                  <img src={item.image} className="img" alt="img" />
                </div>
              );
            })}
          </div>
          <div className="total">
            <p className="total-price">Total: ₹{totalAmount}</p>
          </div>
          <div className="buy">
            <button className="buy-btn" onClick={() => submit()}>
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
