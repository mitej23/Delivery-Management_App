import React from "react";

import firebase from "firebase";
import "firebase/firestore";

const Order = ({ data, id }) => {
  const name = "John Doe";
  const [stage, setStage] = React.useState(0);
  const [OrderCompleted, setOrderCompleted] = React.useState(false);

  const db = firebase.firestore();

  const OrderTaken = () => {
    const db = firebase.firestore();
    setStage(stage + 1);

    db.collection("users")
      .doc(id)
      .update({
        rider: name,
        status: "accepted",
      })
      .then(() => {
        console.log("User updated!");
      });
    console.log("Order Taken");
  };

  const completeOrder = () => {
    setStage(stage + 1);
    const db = firebase.firestore();

    db.collection("users")
      .doc(id)
      .update({
        status: "completed",
      })
      .then(() => {
        console.log("User updated!");
      });
    setOrderCompleted(true);
  };

  console.log(data);

  return (
    <>
      <div
        style={{
          flex: 1,
          width: "300px",
          border: "1px solid grey",
          borderRadius: "15px",
          marginTop: "18px",
          padding: "10px",
          alignContent: data.status === "completed" ? "center" : null,
          justifyContent: data.status === "completed" ? "center" : null,
          position: "relative",
        }}
      >
        <div style={{ opacity: data.status === "completed" ? 0.1 : 1 }}>
          <p style={{ fontSize: 20, fontWeight: "bold" }}>
            {data.order.orderId}
          </p>
          <p>Ordered At: {data.order.time}</p>
          <p>Total Amount: {data.order.total}</p>
          <p style={{ marginBottom: "15px" }}>
            Total Items:{" "}
            {data.order.items.reduce((acc, item) => acc + item.quantity, 0)}
          </p>
          {data.status === "submitted" ? (
            <button title="Take Order" onClick={OrderTaken}>
              Take Order
            </button>
          ) : data.status === "accepted" ? (
            <button
              title={`Order Taken By : ${name}`}
              onClick={completeOrder}
            >{`Order Taken By : ${name}`}</button>
          ) : (
            <button onClick={completeOrder}>Order Completed</button>
          )}
        </div>
        {data.status === "completed" && (
          <p
            style={{
              fontSize: 20,
              fontWeight: "bold",
              position: "absolute",
              color: "green",
              top: "37%",
              left: "20%",
            }}
          >
            Order Completed
          </p>
        )}
      </div>
    </>
  );
};

export default Order;
