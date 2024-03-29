import React, { Fragment } from "react";
const { encodePostTransaction } = require('../../helpers/handle/post');
import axios from 'axios';
import { toastr } from "react-redux-toastr";

class Postbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postContent : ''
    };
  }

  handleSubmit = async () =>{
     const privateKey = window.localStorage.getItem("PrivateKey");
    const user = JSON.parse(window.localStorage.getItem("User"));
    let finalCode = encodePostTransaction(user.publicKey, privateKey, this.state.postContent, user.sequence+1);
    console.log(finalCode);
    console.log(this.state.postContent);
    await axios.get('https://komodo.forest.network/broadcast_tx_commit?tx=' + finalCode)
    .then(response => {
      console.log(response);
      if( response.data.result.check_tx.code === 1 )
      toastr.error("Tweetchain", response.data.result.check_tx.log);
      else
      toastr.success("Tweetchain", "Success");
    })
    .catch(error => {
      toastr.error("Tweetchain", error.message);
      console.log(error);
    });  
    await this.props.getUpdateUser();
  }

  handleChange = (e) => {
    this.setState({postContent: e.target.value});
  }
  render() {
    const user = JSON.parse(window.localStorage.getItem("User"));
    return (
      <Fragment>
        <div className="create-post">
          <div className="row">
            <div className="col-md-10 col-sm-10">
              <div className="form-group">
                <img src={user.picture} alt="" className="profile-photo-md" />
                <textarea
                  name="texts"
                  id="exampleTextarea"
                  cols={100}
                  rows={1}
                  className="form-control"
                  placeholder="Write what you wish"
                  defaultValue={""}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col-md-2 col-sm-2">
              <div className="tools">
                <button className="btn btn-primary pull-right" onClick={this.handleSubmit}>Publish</button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Postbox;
