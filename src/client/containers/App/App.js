import React, {Fragment} from "react";
import { Helmet } from "react-helmet";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "../../components/PrivateRoute";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NotFoundPage from "../NotFoundPage";
import Profile from "../Profile";
import Login from "../Login";
import EditProfile from "../EditProfile";
import Register from "../Register";
import Test from "../Test";
import ReduxToastr from 'react-redux-toastr';

import "./style.css";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const App = props => {
  return (
    <Fragment>
      <Helmet
        titleTemplate="Tweet-Chain - Social Network"
        defaultTitle="Tweet-Chain"
      >
        <meta name="description" content="Tweet-Chain" />
      </Helmet>

        <div>
         <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-left"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            closeOnToastrClick
          />
          </div>
      <Header user={window.localStorage.getItem('User')}/>
        <Switch>
          <Route path="/test" component={Test} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute exact path="/profile/:publicKey"  component={props => <Profile match={props.match.params} />} />
          <PrivateRoute exact path="/" component={Profile} />
          <Route path="" component={NotFoundPage} />
        </Switch>

      <Footer />
    </Fragment>
  );
};

export default App;
