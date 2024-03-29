import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import createHistory from "history/createBrowserHistory";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import App from "./containers/App";
import reducersApp from "./reducers";
import thunk from "redux-thunk"; //import thunk

const history = createHistory();

const store = createStore(reducersApp, applyMiddleware(thunk));

class Application extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>

      </Provider>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
