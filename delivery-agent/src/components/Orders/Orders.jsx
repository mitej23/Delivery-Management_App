import React from "react";
import "./Orders.styles.css";

import Order from "../Order/Order";

const Orders = ({ name }) => {
  const [order, setOrder] = React.useState({
    orderId: "#" + Math.floor(1000 + Math.random() * 9000),
    items: [
      {
        name: "Chicken Tikka Masala",
        price: 234,
        quantity: 3,
      },
    ],
    total: 1000,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  });

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    setData({
      location: {
        lat: 23424,
        lng: 23423,
      },
      order: order,
      status: "submitted",
      rider: null,
    });
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      <h2>{name}</h2>
      {data != null ? (
        <>
          <Order data={data} />
          <Order data={data} />{" "}
        </>
      ) : null}
    </div>
  );
};

export default Orders;
