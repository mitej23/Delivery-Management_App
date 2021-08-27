import React, { useState } from "react";
import "./App.css";
import Orders from "./components/Orders/Orders";

function App() {
  const [name, setName] = useState("");
  const [logedIn, setLogedIn] = useState(false);

  const handleLogin = () => {
    if (name === "") {
      setLogedIn(true);
    }
    setLogedIn(true);
  };

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
