import React, { Fragment } from "react";

const ProfileBanner = props => {
  return (
    <Fragment>
      <div
        className="timeline-cover"
        style={{
          background: "url('../images/banner.jpg') no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        {/*Timeline Menu for Large Screens*/}
        <div className="timeline-nav-bar hidden-sm hidden-xs">
          <div className="row">
            <div className="col-md-3">
              <div className="profile-info">
                <img
                  src={props.user.picture}
                  alt=""
                  className="img-responsive profile-photo"
                />
                <h3>{props.user.name}</h3>
                <p className="text-muted">TweetChainer</p>
              </div>
            </div>
            <div className="col-md-9">
              <ul className="list-inline profile-menu">
                <li>
                  <a href="#" onClick={()=>{
                    props.OpenTimeline();
                  }} className={props.Open === "Timeline" ? "active": ""}>
                    TimeLine
                  </a>
                </li>
                <li>
                  <a href="#" className={props.Open === "Follow" ? "active": ""} onClick={()=>{
                    props.openfollow();
                  }}>Followings</a>
                </li>
                <li>
                  <a href="#" className={props.Open === "Payment" ? "active": ""} onClick={()=>{
                    props.openPayment();
                  }}>Payment</a>
                </li>
              </ul>
              <ul className="follow-me list-inline">
                <li>{props.user.name} is following {props.countFollow} people</li>
                <li>
                  <button className="btn-primary">Follow</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/*Timeline Menu for Large Screens End*/}
        {/*Timeline Menu for Small Screens*/}
        <div className="navbar-mobile hidden-lg hidden-md">
          <div className="profile-info">
            <img
              src={props.user.picture}
              alt=""
              className="img-responsive profile-photo"
            />
            <h4>{props.user.name}</h4>
            <p className="text-muted">TweetChainer</p>
          </div>
          <div className="mobile-menu">
            <ul className="list-inline">
              <li>
                <a href="#" className="active">
                  Timeline
                </a>
              </li>
              <li>
                <a href="#" onClick={props.handleOpenModal}>Followings</a>
              </li>
              <li>
                <a href="timeline-album.html">Transaction</a>
              </li>
            </ul>
            <button className="btn-primary">Follow</button>
          </div>
        </div>
        {/*Timeline Menu for Small Screens End*/}
      </div>
    </Fragment>
  );
};

export default ProfileBanner;
