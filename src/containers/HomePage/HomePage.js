import React from "react";
import "./style.css";

const HomePage = props => {
  return (
    <div className="timeline">
      <div className="timeline-cover">
        {/*Timeline Menu for Large Screens*/}
        <div className="timeline-nav-bar hidden-sm hidden-xs">
          <div className="row">
            <div className="col-md-3">
              <div className="profile-info">
                <img
                  src="images/users/avatar.jpg"
                  alt=""
                  className="img-responsive profile-photo"
                />
                <h3>Ngô Hải Yến</h3>
                <p className="text-muted">FourLeaf</p>
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
                <li>1,299 people following her</li>
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
              src="images/users/avatar.jpg"
              alt=""
              className="img-responsive profile-photo"
            />
            <h4>Ngô Hải Yến</h4>
            <p className="text-muted">FourLeaf</p>
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
      <div id="page-contents">
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-7">
            {/* Post Create Box
================================================= */}
            <div className="create-post">
              <div className="row">
                <div className="col-md-7 col-sm-7">
                  <div className="form-group">
                    <img
                      src="images/users/avatar.jpg"
                      alt=""
                      className="profile-photo-md"
                    />
                    <textarea
                      name="texts"
                      id="exampleTextarea"
                      cols={30}
                      rows={1}
                      className="form-control"
                      placeholder="Write what you wish"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="col-md-5 col-sm-5">
                  <div className="tools">
                    <ul className="publishing-tools list-inline">
                      <li>
                        <a href="/">
                          <i className="ion-compose" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="ion-images" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="ion-ios-videocam" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="ion-map" />
                        </a>
                      </li>
                    </ul>
                    <button className="btn btn-primary pull-right">
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Post Create Box End*/}
            {/* Post Content
================================================= */}
            <div className="post-content">
              {/*Post Date*/}
              <div className="post-date hidden-xs hidden-sm">
                <h5>Hải Yến</h5>
                <p className="text-grey">Sometimes ago</p>
              </div>
              {/*Post Date End*/}
              <img
                src="images/post-images/14.jpg"
                alt=""
                className="img-responsive post-image"
              />
              <div className="post-container">
                <img
                  src="images/users/avatar.jpg"
                  alt="user"
                  className="profile-photo-md pull-left"
                />
                <div className="post-detail">
                  <div className="user-info">
                    <h5>
                      <a href="timeline.html" className="profile-link">
                        Ngô Hải Yến
                      </a>{" "}
                      <span className="following">following</span>
                    </h5>
                    <p className="text-muted">
                      Published a photo about 15 mins ago
                    </p>
                  </div>
                  <div className="reaction">
                    <a href="/" className="btn text-green">
                      <i className="icon ion-thumbsup" /> 13
                    </a>
                    <a href="/" className="btn text-red">
                      <i className="fa fa-thumbs-down" /> 0
                    </a>
                  </div>
                  <div className="line-divider" />
                  <div className="post-text">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.{" "}
                      <i className="em em-anguished" />{" "}
                      <i className="em em-anguished" />{" "}
                      <i className="em em-anguished" />
                    </p>
                  </div>
                  <div className="line-divider" />
                  <div className="post-comment">
                    <img
                      src="images/users/user-11.jpg"
                      alt=""
                      className="profile-photo-sm"
                    />
                    <p>
                      <a href="timeline.html" className="profile-link">
                        Diana{" "}
                      </a>
                      <i className="em em-laughing" /> Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad
                      minim veniam, quis nostrud{" "}
                    </p>
                  </div>
                  <div className="post-comment">
                    <img
                      src="images/users/user-4.jpg"
                      alt=""
                      className="profile-photo-sm"
                    />
                    <p>
                      <a href="timeline.html" className="profile-link">
                        John
                      </a>{" "}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud{" "}
                    </p>
                  </div>
                  <div className="post-comment">
                    <img
                      src="images/users/avatar.jpg"
                      alt=""
                      className="profile-photo-sm"
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Post a comment"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Post Content
================================================= */}
            <div className="post-content">
              {/*Post Date*/}
              <div className="post-date hidden-xs hidden-sm">
                <h5>Hải Yến</h5>
                <p className="text-grey">10/22/2016</p>
              </div>
              {/*Post Date End*/}
              <img
                src="images/post-images/15.jpg"
                alt=""
                className="img-responsive post-image"
              />
              <div className="post-container">
                <img
                  src="images/users/avatar.jpg"
                  alt="user"
                  className="profile-photo-md pull-left"
                />
                <div className="post-detail">
                  <div className="user-info">
                    <h5>
                      <a href="timeline.html" className="profile-link">
                        Ngô Hải Yến
                      </a>{" "}
                      <span className="following">following</span>
                    </h5>
                    <p className="text-muted">Yesterday</p>
                  </div>
                  <div className="reaction">
                    <a href="/" className="btn text-green">
                      <i className="icon ion-thumbsup" /> 49
                    </a>
                    <a href="/" className="btn text-red">
                      <i className="fa fa-thumbs-down" /> 0
                    </a>
                  </div>
                  <div className="line-divider" />
                  <div className="post-text">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.{" "}
                      <i className="em em-anguished" />{" "}
                      <i className="em em-anguished" />{" "}
                      <i className="em em-anguished" />
                    </p>
                  </div>
                  <div className="line-divider" />
                  <div className="post-comment">
                    <img
                      src="images/users/user-11.jpg"
                      alt=""
                      className="profile-photo-sm"
                    />
                    <p>
                      <a href="timeline.html" className="profile-link">
                        Diana{" "}
                      </a>
                      <i className="em em-laughing" /> Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad
                      minim veniam, quis nostrud{" "}
                    </p>
                  </div>
                  <div className="post-comment">
                    <img
                      src="images/users/user-4.jpg"
                      alt=""
                      className="profile-photo-sm"
                    />
                    <p>
                      <a href="timeline.html" className="profile-link">
                        John
                      </a>{" "}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud{" "}
                    </p>
                  </div>
                  <div className="post-comment">
                    <img
                      src="images/users/avatar.jpg"
                      alt=""
                      className="profile-photo-sm"
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Post a comment"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Post Content
================================================= */}
            <div className="post-content">
              {/*Post Date*/}
              <div className="post-date hidden-xs hidden-sm">
                <h5>Hải Yến</h5>
                <p className="text-grey">10/21/2016</p>
              </div>
              {/*Post Date End*/}
              <div className="post-container">
                <img
                  src="images/users/avatar.jpg"
                  alt="user"
                  className="profile-photo-md pull-left"
                />
                <div className="post-detail">
                  <div className="user-info">
                    <h5>
                      <a href="timeline.html" className="profile-link">
                        Ngô Hải Yến
                      </a>{" "}
                      <span className="following">following</span>
                    </h5>
                    <p className="text-muted">2 days ago</p>
                  </div>
                  <div className="reaction">
                    <a href="/" className="btn text-green">
                      <i className="icon ion-thumbsup" /> 49
                    </a>
                    <a href="/" className="btn text-red">
                      <i className="fa fa-thumbs-down" /> 0
                    </a>
                  </div>
                  <div className="line-divider" />
                  <div className="post-text">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.{" "}
                      <i className="em em-anguished" />{" "}
                      <i className="em em-anguished" />{" "}
                      <i className="em em-anguished" />
                    </p>
                  </div>
                  <div className="line-divider" />
                  <div className="post-comment">
                    <img
                      src="images/users/user-11.jpg"
                      alt=""
                      className="profile-photo-sm"
                    />
                    <p>
                      <a href="timeline.html" className="profile-link">
                        Diana{" "}
                      </a>
                      <i className="em em-laughing" /> Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad
                      minim veniam, quis nostrud{" "}
                    </p>
                  </div>
                  <div className="post-comment">
                    <img
                      src="images/users/user-4.jpg"
                      alt=""
                      className="profile-photo-sm"
                    />
                    <p>
                      <a href="timeline.html" className="profile-link">
                        John
                      </a>{" "}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud{" "}
                    </p>
                  </div>
                  <div className="post-comment">
                    <img
                      src="images/users/avatar.jpg"
                      alt=""
                      className="profile-photo-sm"
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Post a comment"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2 static">
            <div id="sticky-sidebar">
              <h4 className="grey">Hải Yến's activity</h4>
              <div className="feed-item">
                <div className="live-activity">
                  <p>
                    <a href="/" className="profile-link">
                      Hải Yến
                    </a>{" "}
                    Commended on a Photo
                  </p>
                  <p className="text-muted">5 mins ago</p>
                </div>
              </div>
              <div className="feed-item">
                <div className="live-activity">
                  <p>
                    <a href="/" className="profile-link">
                      Hải Yến
                    </a>{" "}
                    Has posted a photo
                  </p>
                  <p className="text-muted">an hour ago</p>
                </div>
              </div>
              <div className="feed-item">
                <div className="live-activity">
                  <p>
                    <a href="/" className="profile-link">
                      Hải Yến
                    </a>{" "}
                    Liked her friend's post
                  </p>
                  <p className="text-muted">4 hours ago</p>
                </div>
              </div>
              <div className="feed-item">
                <div className="live-activity">
                  <p>
                    <a href="/" className="profile-link">
                      Hải Yến
                    </a>{" "}
                    has shared an album
                  </p>
                  <p className="text-muted">a day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
