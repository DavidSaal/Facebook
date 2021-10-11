import React from "react";
import Homepage from "../views/Homepage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "../reducers";

const App = () => {
  const store = createStore(allReducers);

  return (
    <Provider store={store}>
      <Homepage />
    </Provider>
  );
};

export default App;
