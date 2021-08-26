import "./App.css";
import Header from "./components/Header/header";
import Shop from "./components/Shop/shop";

import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Header />
        <Shop />
      </Provider>
    </div>
  );
}

export default App;
