import React from "react";

const Order = ({ data }) => {
  const name = "John Doe";
  const [stage, setStage] = React.useState(0);
  const [OrderCompleted, setOrderCompleted] = React.useState(false);

  const OrderTaken = () => {
    // const db = firebase.firestore();
    setStage(stage + 1);
    // db.collection("orders")
    //   .doc(data.order.orderId)
    //   .update({
    //     rider: name,
    //     status: "accepted",
    //   })
    //   .then(() => {
    //     console.log("User updated!");
    //   });
    console.log("Order Taken");
  };

  const completeOrder = () => {
    setStage(stage + 1);
    // const db = firebase.firestore();

    // db.collection("orders")
    //   .doc(data.order.orderId)
    //   .update({
    //     status: "completed",
    //   })
    //   .then(() => {
    //     console.log("User updated!");
    //   });
    setOrderCompleted(true);
  };

  console.log(data);

  return (
    <>
      <div
        style={{
          flex: 1,
          widht: "100%",
          border: "1px solid grey",
          borderRadius: "15px",
          marginTop: "18px",
          padding: "10px",
          alignContent: data.status === "completed" ? "center" : null,
          justifyContent: data.status === "completed" ? "center" : null,
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
              alignSelf: "center",
              color: "green",
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
