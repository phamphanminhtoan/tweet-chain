import React from "react";
const Payment = props => {
  const { payment } = props;
  return (
    <div>
      {!payment.isFetching ? (!payment.error ? (
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
                      {e.sender.name ? e.sender.name : "NoName"}<br/>
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
      ): <p>Không có giao dịch chuyển khoản nào.</p> ) : (
        <center><div className="loader"></div></center>
      )}
    </div>
  );
};

export default Payment;
