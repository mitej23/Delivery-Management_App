import React, { useState } from "react";
import "./App.css";
import Orders from "./components/Orders/Orders";

import firebaseConfig from "./config";
import firebase from "firebase/app";

function App() {
  const [name, setName] = useState("");
  const [logedIn, setLogedIn] = useState(false);

  const handleLogin = () => {
    if (name === "") {
      setLogedIn(true);
    }
    setLogedIn(true);
  };

  if (firebase.apps.length > 0) {
  } else {
    firebase.initializeApp(firebaseConfig);
  }

  return (
    <div className="App">
      {logedIn ? (
        <Orders name={name} />
      ) : (
        <div className="form">
          <p>Enter your name:</p>
          <input
            onChange={(e) => setName(e.target.value)}
            className="input-name"
          />
          <br />
          <button onClick={handleLogin} className="submit-btn">
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
