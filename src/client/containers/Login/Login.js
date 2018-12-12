import React from "react";

const Login = props => {
  return (
    <div className="container">
    <div className="row">
    <br />
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Login Tweet Chain</h3>
          </div>
          <div className="panel-body">
            <form acceptCharset="UTF-8" role="form">
              <fieldset>
                <div className="form-group">
                  <input className="form-control" placeholder="yourmail@example.com" name="email" type="text" />
                </div>
                <div className="form-group">
                  <input className="form-control" placeholder="Password" name="password" type="password" defaultValue />
                </div>
                <div className="checkbox">
                  <label>
                    <input name="remember" type="checkbox" defaultValue="Remember Me" /> Remember Me
                  </label>
                </div>
                <button className="btn btn-lg btn-success btn-block" type="submit">Login</button>
              </fieldset>
            </form>
            <hr />
            <center><h4>OR</h4></center>
            <button className="btn btn-lg btn-facebook btn-block" type="submit" >Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
