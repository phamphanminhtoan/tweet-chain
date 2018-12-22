import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import createHistory from "history/createBrowserHistory";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import App from "./containers/App";
import reducers from "./reducers";
import thunk from "redux-thunk"; //import thunk
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const history = createHistory();

const store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);

class Application extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
            <App />
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
