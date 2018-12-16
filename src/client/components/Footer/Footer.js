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
                <img src="images/tc-black.png" alt="" className="footer-logo" />
              </a>
              <ul className="list-inline social-icons">
                <li>
                  <a href="/">
                    <i className="fa fa-social-facebook" />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-social-twitter" />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-social-googleplus" />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-social-pinterest" />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-social-linkedin" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-2 col-sm-2">
              <h5>For individuals</h5>
              <ul className="footer-links">
                <li>
                  <a href="/">Signup</a>
                </li>
                <li>
                  <a href="/">login</a>
                </li>
                <li>
                  <a href="/">Explore</a>
                </li>
                <li>
                  <a href="/">Finder app</a>
                </li>
                <li>
                  <a href="/">Features</a>
                </li>
                <li>
                  <a href="/">Language settings</a>
                </li>
              </ul>
            </div>
            <div className="col-md-2 col-sm-2">
              <h5>For businesses</h5>
              <ul className="footer-links">
                <li>
                  <a href="/">Business signup</a>
                </li>
                <li>
                  <a href="/">Business login</a>
                </li>
                <li>
                  <a href="/">Benefits</a>
                </li>
                <li>
                  <a href="/">Resources</a>
                </li>
                <li>
                  <a href="/">Advertise</a>
                </li>
                <li>
                  <a href="/">Setup</a>
                </li>
              </ul>
            </div>
            <div className="col-md-2 col-sm-2">
              <h5>About</h5>
              <ul className="footer-links">
                <li>
                  <a href="/">About us</a>
                </li>
                <li>
                  <a href="/">Contact us</a>
                </li>
                <li>
                  <a href="/">Privacy Policy</a>
                </li>
                <li>
                  <a href="/">Terms</a>
                </li>
                <li>
                  <a href="/">Help</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-3">
              <h5>Contact Us</h5>
              <ul className="contact">
                <li>
                  <i className="fa fa-ios-telephone-outline" />
                  +84 326 326 736
                </li>
                <li>
                  <i className="fa fa-ios-email-outline" />
                  phamphanminhtoan@gmail.com
                </li>
                <li>
                  <i className="fa fa-ios-location-outline" />
                  227 Nguyen Van Cu, District 5, HCM city
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>Team chị Yến. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
