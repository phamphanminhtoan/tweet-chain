import React from "react";
import "./style.css";

const Footer = props => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="row">
          <div className="footer-wrapper">
            <div className="col-md-3 col-sm-3">
              <a href="/">
                <img src="../images/tc-black.png" alt="" className="footer-logo" />
              </a>
            </div>
            <div className="col-md-2 col-sm-2">
            </div>
            <div className="col-md-2 col-sm-2">
            </div>
            <div className="col-md-2 col-sm-2">
            </div>
            <div className="col-md-3 col-sm-3">
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>TweetChain. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
