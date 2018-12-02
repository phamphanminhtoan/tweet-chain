import React, {Fragment} from "react";
import { Helmet } from "react-helmet";
import { Switch, Route } from "react-router-dom";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NotFoundPage from "../NotFoundPage";
import HomePage from "../HomePage";
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
          <Route exact path="/" component={HomePage} />
          <Route path="/test" component={Test} />
          <Route path="" component={NotFoundPage} />
        </Switch>

      <Footer />
    </Fragment>
  );
};

export default App;
