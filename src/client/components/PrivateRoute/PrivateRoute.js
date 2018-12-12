import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authUserFromServer } from "../../containers/App/action";

const PrivateRoute = ({ component: Component, ...rest }) => {
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
  authUserFromServer: () => dispatch(authUserFromServer())
});

export default connect(mapStateToProps,mapDispatchToProps)(PrivateRoute);
