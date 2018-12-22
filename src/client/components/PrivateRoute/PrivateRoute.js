import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(rest.isAuthenticated);
  return (
    <Route
      {...rest}
      render={propser =>
        rest.isAuthenticated ? (
          <Component {...propser} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: propser.location }
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
});

export default connect(mapStateToProps,mapDispatchToProps)(PrivateRoute);
