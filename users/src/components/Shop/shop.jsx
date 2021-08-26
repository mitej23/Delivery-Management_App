import React from "react";
import { data } from "../../data/data";
import "./shop.styles.css";

const Shop = () => {
  return (
    <div className="shop">
      <h1>Shop</h1>
      <div className="shop-container" style={{ display: "flex" }}>
        {data.map((item) => {
          console.log(item.image);
          return (
            <div className="shop-item" key={item.id}>
              <img src={item.image} alt={item.name} className="image" />
              <h3>{item.name}</h3>
              <p>₹ {item.price}</p>
              <button className="add-btn">Add to cart</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
