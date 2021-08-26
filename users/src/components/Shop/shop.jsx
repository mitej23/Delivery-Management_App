import React from "react";

import "./shop.styles.css";

import { connect } from "react-redux";
import { selectAllItems } from "../../redux/menu/menu.selectors";
import { increment, decrement, remove } from "../../redux/index";

const Shop = ({ items, increment, decrement, remove }) => {
  console.log(items);
  return (
    <div className="shop">
      <h1>Shop</h1>
      <div className="shop-container" style={{ display: "flex" }}>
        {items.map((item) => {
          return (
            <div className="shop-item" key={item.id}>
              <img src={item.image} alt={item.name} className="image" />
              <h3>{item.name}</h3>
              <p>₹ {item.price}</p>
              <button className="add-btn" onClick={() => increment(item.id)}>
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: selectAllItems(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: (id) => dispatch(increment(id)),
    decrement: (id) => dispatch(decrement(id)),
    remove: (id) => dispatch(remove(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
