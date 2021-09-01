import "./App.css";

import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./redux/store";
import Home from "./pages/Home/Home";
import Checkout from "./pages/Checkout/Checkout";

import firebaseConfig from "./config";
import firebase from "firebase/app";
import MapTracking from "./pages/Map_tracking/MapTracking";

function App() {
  if (firebase.apps.length > 0) {
  } else {
    firebase.initializeApp(firebaseConfig);
  }
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/tracking" component={MapTracking} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
