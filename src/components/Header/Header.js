import React from "react";
import "./style.css";

const Header = props => {
  return (
    <header id="header">
      <nav className="navbar navbar-default navbar-fixed-top menu">
        <div className="container">
          {/* Brand and toggle get grouped for better mobile display */}
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="/">
              <img src="images/tc.png" alt="logo" />
            </a>
          </div>
          {/* Collect the nav links, forms, and other content for toggling */}
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right main-menu">
              <li className="dropdown">
                <a
                  href="/register"
                  className="dropdown-toggle"
                >
                  Register
                </a>
                
              </li>
              <li className="dropdown">
                {props.user ? (
                  <a
                    href="/"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {props.user.username}
                    <span>
                      <img src="images/down-arrow.png" alt="" />
                    </span>
                  </a>
                ) : (
                  <a href="/login">Login</a>
                )}

                {props.user ? (
                  <ul className="dropdown-menu login">
                    <li>
                      <a href="#">Profile</a>
                    </li>
                    <li>
                      <a href="#">Edit Profile</a>
                    </li>
                    <li>
                      <a href="#">Log out</a>
                    </li>
                  </ul>
                ) : (
                  <div />
                )}
              </li>
              <li className="dropdown">
                <a href="contact.html">
                  Contact{" "}
                  <span>
                    <img src="images/down-arrow.png" alt="" />
                  </span>
                </a>
              </li>
            </ul>
            <form className="navbar-form navbar-right hidden-sm">
              <div className="form-group">
                <i className="icon ion-android-search" />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search friends, photos, videos"
                />
              </div>
            </form>
          </div>
          {/* /.navbar-collapse */}
        </div>
        {/* /.container */}
      </nav>
    </header>
  );
};

export default Header;
