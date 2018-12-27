import React from "react";
const { encodeCreateAccountTransaction, createPublicKey, createSecretKey, renew } = require("../../helpers/handle/create_account");
const { encodeUpdateNameTransaction, encodeUpdatePictureTransaction } = require("../../helpers/handle/update");
import axios from "axios";
import { toastr } from "react-redux-toastr";

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateName: "",
      file: '',
      publicKey: '',
      privateKey: '',
    };
  }

  componentDidMount = ()=>{
    this.setState({publicKey: createPublicKey(), privateKey: createSecretKey()});
  }

  componentWillReceiveProps= ()=>{
    renew();
    this.setState({publicKey: createPublicKey(), privateKey: createSecretKey()});
}

    renewFunc=()=>{
        renew();
        this.setState({publicKey: createPublicKey(), privateKey: createSecretKey()});
      
    }

  handleChangeName = e => {
    this.setState({ updateName: e.target.value });
  };

  handleChangeImage = e => {
    this.setState({ file: e.target.value });
  };

  handleChangeKey = e => {
    this.setState({ publicKey: e.target.value });
  };

  handleSubmitName = async () => {
    const privateKey = window.localStorage.getItem("PrivateKey");
    const user = JSON.parse(window.localStorage.getItem("User"));
 
    if(this.state.updateName ==="")
    {
        toastr.error("Tweetchin","Name must not be empty");
        return;
    }
    let finalCode = encodeUpdateNameTransaction(
      user.publicKey,
      privateKey,
      this.state.updateName,
      user.sequence + 1
    );
    await axios
      .get("https://komodo.forest.network/broadcast_tx_commit?tx=" + finalCode)
      .then(response => {
        console.log(response);
        if (response.data.result.check_tx.code === 1)
          toastr.error("Tweetchain", response.data.result.check_tx.log);
        else toastr.success("Tweetchain", "Success");
      })
      .catch(error => {
        toastr.error("Tweetchain", error.message);
        console.log(error);
      });
    await this.props.getUpdateUser();
  };

  handleSubmitCreate = async () => {
    const privateKey = window.localStorage.getItem("PrivateKey");
    const user = JSON.parse(window.localStorage.getItem("User"));

    let finalCode = encodeCreateAccountTransaction(
      user.publicKey,
      privateKey,
      this.state.publicKey,
      user.sequence + 1
    );
    await axios
      .get("https://komodo.forest.network/broadcast_tx_commit?tx=" + finalCode)
      .then(response => {
        console.log(response);
        if(response.data.result){
            if (response.data.result.check_tx.code === 1)
            toastr.error("Tweetchain", response.data.result.check_tx.log);
          else toastr.success("Tweetchain", "Success");
        }else{
            toastr.error("Tweetchain", response.data.error.message  );
        }
       
      })
      .catch(error => {
        toastr.error("Tweetchain", error.message);
        console.log(error);
      });
    await this.props.getUpdateUser();
  };

  
  handleSubmitPicture = async () => {
    const privateKey = window.localStorage.getItem("PrivateKey");
    const user = JSON.parse(window.localStorage.getItem("User"));

    let finalCode = encodeUpdatePictureTransaction(
      user.publicKey,
      privateKey,
      this.state.file,
      user.sequence + 1
    );
    await axios
      .get("https://komodo.forest.network/broadcast_tx_commit?tx=" + finalCode)
      .then(response => {
        console.log(response);
        if (response.data.result.check_tx.code === 1)
          toastr.error("Tweetchain", response.data.result.check_tx.log);
        else toastr.success("Tweetchain", "Success");
      })
      .catch(error => {
        toastr.error("Tweetchain", error.message);
        console.log(error);
      });
    await this.props.getUpdateUser();
  };

  
  render() {
    const { payment } = this.props;
    return (
      <div>
        <div className="post-content">
          <div className="post-container">
            <div className="form-group">
            <center><h2>Change Name</h2></center>
              <label>New Name : </label>
              <input
                type="text"
                className="form-control"
                value={this.state.updateName}
                onChange={this.handleChangeName}
              />
            </div>
            <center>
              <button className={"btn btn-success"} onClick={this.handleSubmitName}>
                Update
              </button>
            </center>
          </div>
        </div>
        <br />
        <br />
        <div className="post-content">
          <div className="post-container">
            <div className="form-group">
            <center><h2>Change Avatar</h2></center>
              <label>Choose a image: </label>
              <input
                type="file"
                className="form-control"
                value={this.state.file}
                onChange={this.handleChangeImage}
    
              />
            </div>
            <center>
              <button className={"btn btn-success"} onClick={this.handleSubmitPicture}>
              Update
              </button>
            </center>
          </div>
        </div>
        <br />
        <br />
        <div className="post-content">
          <div className="post-container">
            <div className="form-group">
            <center><h2>Create Account</h2></center>
              <label>Public Key: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.publicKey}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Private Key: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.privateKey}
                readOnly
              />
            </div>
            <center>
            <button className={"btn btn-success"} onClick={this.renewFunc}>
              Renew
              </button>{"             "}
              <button className={"btn btn-success"} onClick={this.handleSubmitCreate}>
              Create
              </button>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
