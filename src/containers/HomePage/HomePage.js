import React from "react";
import TimelineCover from "../../components/TimelineCover";
import PostBox from "../../components/PostBox";
import "./style.css";

const tempData = {
  fullName: 'Ngô Hải Yến',
  address: 'Hanoi City',
  followingPeople: '1,120',
  avatarUrl: 'images/users/avatar.jpg',
  coverUrl: '../images/covers/cover.jpg'
}

const HomePage = props => {
  return (
    <div className="timeline">
      <TimelineCover user={tempData} />
      <div id="page-contents">
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-7">
            <PostBox user={tempData} />
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
