import React from "react";
import "./Orders.styles.css";

import Order from "../Order/Order";

import firebase from "firebase";
import "firebase/firestore";

const Orders = ({ name }) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const db = firebase.firestore();
    async function getData() {
      await db.collection("users").onSnapshot((snapshot) => {
        setData(snapshot);
      });
    }
    getData();
  }, []);

  console.log(data);

  return (
    <div className="order-page">
      <h1>Orders</h1>
      <h3 className="welcome">Welcome! {name}</h3>
      {data != null ? (
        <>
          {data &&
            data.docs.map((doc) => <Order key={doc.id} data={doc.data()} id={doc.id}/>)}
        </>
      ) : null}
    </div>
  );
};

export default Orders;
