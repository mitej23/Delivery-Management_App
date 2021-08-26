import React from "react";
import "./header.styles.css";
import { data } from "../../data/data";

//import { IoCart } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";

const Header = () => {
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
      </div>
      {toggleCart ? (
        <div className="cart">
          <>
            <div className="cart-items">
              {data.map((item) => (
                <div className="cart-item">
                  <img
                    className="cart-item-image"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="cart-item-details">
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>{item.quantity} x</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="checkout-btn">Checkout ( ₹1000 )</button>
          </>
        </div>
      ) : null}
    </>
  );
};

export default Header;
