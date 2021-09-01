import React from "react";
import Modal from "react-modal";
import "./Orders.styles.css";

import Order from "../Order/Order";
import Map from "../Map/Map";

//hooks
import useInterval from "../../hooks/useInterval";

//firebase
import firebase from "firebase";
import "firebase/firestore";

//socketio
import io from "socket.io-client";
let endPoint = "http://127.0.0.1:5000/";
let socket = io.connect(`${endPoint}`);
var privateSocket = io(`${endPoint}join`);

const Orders = ({ name }) => {
  const [data, setData] = React.useState(null);
  const [map, setMap] = React.useState(false);
  const [orderLocation, setOrderLocation] = React.useState(null);
  const [ordersTakenBy, setOrdersTakenBy] = React.useState([]);
  const [myLocation, setMyLocation] = React.useState(null);

  React.useEffect(() => {
    const db = firebase.firestore();
    async function getData() {
      await db.collection("users").onSnapshot((snapshot) => {
        setData(snapshot);
      });
    }
    getData();
  }, []);

  React.useEffect(() => {
    if (data !== null) {
      const names = data.docs.map((doc) => {
        const data = doc.data();
        if (data.rider === name && data.status === "accepted") {
          return data.order.name;
        }
        return null;
      });
      setOrdersTakenBy(names);
    }
  }, [data]);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;

      setMyLocation({ lat, lng });
    });
  }, []);

  React.useEffect(() => {

    socket.on("connect", () => {
      privateSocket.emit("join", name);
    });

    privateSocket.on("new-location", (message) => {
      console.log("Location received");
      console.log(message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useInterval(() => {
    // Your custom logic here
    ordersTakenBy.forEach((name) => {
      if (name != null) {
        
        privateSocket.emit("location", myLocation, name);
        //increment location by 0.001
        setMyLocation({
          lat: myLocation.lat + 0.0001,
          lng: myLocation.lng + 0.0001,
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, 4000);

  return (
    <div className="order-page">
      <h1>Orders</h1>
      <h3 className="welcome">Welcome! {name}</h3>
      {data != null ? (
        <>
          {data &&
            data.docs.map((doc) => (
              <Order
                key={doc.id}
                data={doc.data()}
                id={doc.id}
                name={name}
                map={map}
                setMap={setMap}
                orderLocation={orderLocation}
                setOrderLocation={setOrderLocation}
              />
            ))}
        </>
      ) : null}

      <Modal isOpen={map}>
        <button onClick={() => setMap(false)} className="modal-exit">
          X
        </button>
        <Map orderLocation={orderLocation} />
      </Modal>
      <button
        onClick={() => socket.emit("location", { lat: 12334, lng: 23423 })}
      >
        Click me
      </button>
    </div>
  );
};

export default Orders;
