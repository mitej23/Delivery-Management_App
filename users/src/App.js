import "./App.css";

import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./redux/store";
import Home from "./pages/Home/Home";
import Checkout from "./pages/Checkout/Checkout";

import firebaseConfig from "./config";
import firebase from "firebase/app";

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
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
