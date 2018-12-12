import React, {Component} from 'react';

const Register = (props) => {
    return ( 
        <div className="container">
        <div className="row">
        <br />
          <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Register Tweet Chain</h3>
              </div>
              <div className="panel-body">
                <form acceptCharset="UTF-8" role="form">
                  <fieldset>
                    <div className="form-group">
                      <input className="form-control" placeholder="Email" name="email" type="text" />
                    </div>
                    <div className="form-group">
                      <input className="form-control" placeholder="Password" name="password" type="password" defaultValue />
                    </div>
                    <div className="form-group">
                      <input className="form-control" placeholder="Re-Password" name="repassword" type="password" defaultValue />
                    </div>
                    <div className="form-group">
                      <input className="form-control" placeholder="Fullname" name="fullname" type="text" />
                    </div>
                    <div className="form-group">
                      <input className="form-control" placeholder="Phone Number" name="fullname" type="text" />
                    </div>
                    <button className="btn btn-lg btn-success btn-block" type="submit">Sign Up</button>
                  </fieldset>
                </form>
    
              </div>
            </div>
          </div>
        </div>
      </div>
     );
}
 
export default Register;