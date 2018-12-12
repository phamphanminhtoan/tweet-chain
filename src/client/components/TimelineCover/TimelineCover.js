import React, { Fragment } from "react";

const ProfileBanner = props => {
  return (
    <Fragment>
      <div
        className="timeline-cover"
        style={{
          background: "url(" + props.user.coverUrl + ") no-repeat",
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
                  src={props.user.avatarUrl}
                  alt=""
                  className="img-responsive profile-photo"
                />
                <h3>{props.user.fullName}</h3>
                <p className="text-muted">{props.user.address}</p>
              </div>
            </div>
            <div className="col-md-9">
              <ul className="list-inline profile-menu">
                <li>
                  <a to="/" className="active">
                    Timeline
                  </a>
                </li>
                <li>
                  <a to="/about">About</a>
                </li>
                <li>
                  <a href="timeline-album.html">Album</a>
                </li>
                <li>
                  <a href="timeline-friends.html">Friends</a>
                </li>
              </ul>
              <ul className="follow-me list-inline">
                <li>{props.user.followingPeople} people following her</li>
                <li>
                  <button className="btn-primary">Add Friend</button>
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
              src={props.user.avatarUrl}
              alt=""
              className="img-responsive profile-photo"
            />
            <h4>{props.user.fullName}</h4>
            <p className="text-muted">{props.user.address}</p>
          </div>
          <div className="mobile-menu">
            <ul className="list-inline">
              <li>
                <a href="timline.html" className="active">
                  Timeline
                </a>
              </li>
              <li>
                <a href="timeline-about.html">About</a>
              </li>
              <li>
                <a href="timeline-album.html">Album</a>
              </li>
              <li>
                <a href="timeline-friends.html">Friends</a>
              </li>
            </ul>
            <button className="btn-primary">Add Friend</button>
          </div>
        </div>
        {/*Timeline Menu for Small Screens End*/}
      </div>
    </Fragment>
  );
};

export default ProfileBanner;
