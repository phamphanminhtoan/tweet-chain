import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { handleAuthUser } from "../App/action";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      publicKey: '',
      privateKey: ''
     }
  }

  handleChangePublicKey = (e)=>{
    this.setState({ publicKey: e.target.value });
  }

  handleChangePrivateKey = (e)=>{
    this.setState({ privateKey: e.target.value });
  }

  handleLogin = ()=>{
    this.props.handleAuthUser(this.state);
  }

  render() { 
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
                <fieldset>
                  <div className="form-group">
                    <input className="form-control" placeholder="Public Key" name="publicKey" type="text" onChange={this.handleChangePublicKey} />
                  </div>
                  <div className="form-group">
                  <input className="form-control" placeholder="Private Key" name="privateKey" type="text" onChange={this.handleChangePrivateKey} />
                  </div>
                  <div className="checkbox">
                    <label>
                      <input name="remember" type="checkbox" defaultValue="Remember Me" /> Remember Me
                    </label>
                  </div>
                  <button className="btn btn-lg btn-success btn-block" onClick={this.handleLogin} >Login</button>
                </fieldset>
              <hr />
              <center><h4>OR</h4></center>
              <button className="btn btn-lg btn-facebook btn-block"  >Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
     );
  }
}
 
const mapStateToProps = state => ({
  user: state.App.user
});

const mapDispatchToProps = dispatch => ({
  handleAuthUser: (user) => dispatch(handleAuthUser(user))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
