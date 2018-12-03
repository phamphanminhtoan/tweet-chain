import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authUserFromServer } from "../../containers/App/action";
const axios = require("axios");

const PrivateRoute = ({ component: Component, props, ...rest }) => {
  props.authUserFromServer();
  return (
    <Route
      {...rest}
      render={props =>
        props.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.App.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  authUserFromServer: () => dispatch(authUserFromServer())
});

export default connect(mapStateToProps,mapDispatchToProps)(PrivateRoute);
