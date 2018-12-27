import React from "react";
const { encodePaymentTransaction } = require("../../helpers/handle/payment");
import axios from "axios";
import { toastr } from "react-redux-toastr";

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      publicKey: "",
      amount: 0
    };
  }

  handleChangeKey = e => {
    this.setState({ publicKey: e.target.value });
  };
  handleChangeAmount = e => {
    this.setState({ amount: e.target.value });
  };
  handleSubmit = async () => {
    const privateKey = window.localStorage.getItem("PrivateKey");
    const user = JSON.parse(window.localStorage.getItem("User"));
    let amount = parseInt(this.state.amount);
    if (amount > user.balance) {
      toastr.error(
        "Tweetchain",
        "The amount in the account is not enough to make the transaction."
      );
      return;
    }
    if (amount === 0 ) {
      toastr.error(
        "Tweetchain",
        "The input value is incorrect."
      );
      return;
    }
    if (this.state.publicKey === "" ) {
      toastr.error(
        "Tweetchain",
        "The public Key must not be empty."
      );
      return;
    }
    let finalCode = encodePaymentTransaction(
      user.publicKey,
      privateKey,
      this.state.publicKey,
      amount,
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
              <label>Public Key Receiver : </label>
              <input
                type="text"
                className="form-control"
                value={this.state.publicKey}
                onChange={this.handleChangeKey}
              />
            </div>
            <div className="form-group">
              <label>Amount :</label>
              <input
                type="number"
                className="form-control"
                value={this.state.amount}
                onChange={this.handleChangeAmount}
              />
            </div>
            <center>
              <button className={"btn btn-success"} onClick={this.handleSubmit}>
                Send
              </button>
            </center>
          </div>
        </div>
        <br />
        <br />
        {!payment.isFetching ? (
          !payment.error ? (
            payment.listPayment.map((e, pos) => (
              <div className="post-content" key={pos}>
                <div className="post-container">
                  <img
                    src={
                      e.sender.picture
                        ? e.sender.picture
                        : "https://www.lewesac.co.uk/wp-content/uploads/2017/12/default-avatar.jpg"
                    }
                    alt="user"
                    className="profile-photo-md pull-left"
                  />
                  <div className="post-detail">
                    <div className="user-info">
                      <h5>
                        <a
                          href={"/profile/" + e.sender.publicKey}
                          className="profile-link"
                          style={{ fontSize: 20 }}
                        >
                          {e.sender.name ? e.sender.name : "NoName"}
                          <br />
                        </a>
                      </h5>
                      <p className="text-muted">{e.amount}</p>
                    </div>
                    <div className="reaction">
                      <img
                        src={
                          e.receiver.picture
                            ? e.receiver.picture
                            : "https://www.lewesac.co.uk/wp-content/uploads/2017/12/default-avatar.jpg"
                        }
                        alt="user"
                        className="profile-photo-md pull-left"
                      />
                      <div className="user-info">
                        <h5>
                          <a
                            href={"/profile/" + e.receiver.publicKey}
                            className="profile-link"
                            style={{ fontSize: 20 }}
                          >
                            {e.receiver.name ? e.receiver.name : "NoName"}
                          </a>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Không có giao dịch chuyển khoản nào.</p>
          )
        ) : (
          <center>
            <div className="loader" />
          </center>
        )}
      </div>
    );
  }
}

export default Payment;
