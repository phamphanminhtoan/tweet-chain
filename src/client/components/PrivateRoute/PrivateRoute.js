import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let auth=false;
  if(window.localStorage.getItem('User'))
  auth = true;
  return (
    <Route
      {...rest}
      render={propser =>
        auth ? (
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
  isAuthenticated: state.App.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps,mapDispatchToProps)(PrivateRoute);
