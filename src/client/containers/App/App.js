import React, {Fragment} from "react";
import { Helmet } from "react-helmet";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "../../components/PrivateRoute";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NotFoundPage from "../NotFoundPage";
import HomePage from "../HomePage";
import Login from "../Login";
import EditProfile from "../EditProfile";
import Register from "../Register";
import Test from "../Test";

import "./style.css";

const App = props => {
  return (
    <Fragment>
      <Helmet
        titleTemplate="Tweet-Chain - Social Network"
        defaultTitle="Tweet-Chain"
      >
        <meta name="description" content="Tweet-Chain" />
      </Helmet>
      <Header />

        <Switch>
          <Route path="/test" component={Test} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>

      <Footer />
    </Fragment>
  );
};

export default App;
