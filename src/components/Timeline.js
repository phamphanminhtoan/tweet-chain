import React, { Component } from 'react';
import TimelineDetail from './TimelineDetail';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TimelineAbout from './TimelineAbout';

class Timeline extends Component {
    render() {
        return (
            <div>
                {/* Header */}
                <header id="header">
                    <nav className="navbar navbar-default navbar-fixed-top menu">
                        <div className="container">
                            {/* Brand and toggle get grouped for better mobile display */}
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                </button>
                                <a className="navbar-brand" href="index-register.html"><img src="images/tc.png" alt="logo" /></a>
                            </div>
                            {/* Collect the nav links, forms, and other content for toggling */}
                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav navbar-right main-menu">
                                    <li className="dropdown">
                                        <a href="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Newsfeed </a>
                                        <ul className="dropdown-menu newsfeed-home">
                                            <li><a href="newsfeed.html">Newsfeed</a></li>
                                            <li><a href="newsfeed-people-nearby.html">Poeple Nearly</a></li>
                                            <li><a href="newsfeed-friends.html">My friends</a></li>
                                            <li><a href="newsfeed-messages.html">Chatroom</a></li>
                                            <li><a href="newsfeed-images.html">Images</a></li>
                                            <li><a href="newsfeed-videos.html">Videos</a></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown">
                                        <a href="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Phạm Phan Minh Toàn <span><img src="images/down-arrow.png" alt="" /></span></a>
                                        <ul className="dropdown-menu login">
                                            <li><a href="timeline.html">Timeline</a></li>
                                            <li><a href="timeline-about.html">Timeline About</a></li>
                                            <li><a href="timeline-album.html">Timeline Album</a></li>
                                            <li><a href="timeline-friends.html">Timeline Friends</a></li>
                                            <li><a href="edit-profile-basic.html">Edit: Basic Info</a></li>
                                            <li><a href="edit-profile-work-edu.html">Edit: Work</a></li>
                                            <li><a href="edit-profile-interests.html">Edit: Interests</a></li>
                                            <li><a href="edit-profile-settings.html">Account Settings</a></li>
                                            <li><a href="edit-profile-password.html">Change Password</a></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown"><a href="contact.html">Contact <span><img src="images/down-arrow.png" alt="" /></span></a></li>
                                </ul>
                                <form className="navbar-form navbar-right hidden-sm">
                                    <div className="form-group">
                                        <i className="icon ion-android-search" />
                                        <input type="text" className="form-control" placeholder="Search friends, photos, videos" />
                                    </div>
                                </form>
                            </div>{/* /.navbar-collapse */}
                        </div>{/* /.container */}
                    </nav>
                </header>
                {/*Header End*/}
                <div className="container">
                    {/* Timeline
      ================================================= */}
       <Router>
                    <div className="timeline">
                        <div className="timeline-cover">
                            {/*Timeline Menu for Large Screens*/}
                            <div className="timeline-nav-bar hidden-sm hidden-xs">
                           
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="profile-info">
                                            <img src="images/users/avatar.jpg" alt="" className="img-responsive profile-photo" />
                                            <h3>Ngô Hải Yến</h3>
                                            <p className="text-muted">FourLeaf</p>
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <ul className="list-inline profile-menu">
                                            <li><Link to='/' className="active">Timeline</Link></li>
                                            <li><Link to='/about'>About</Link></li>
                                            <li><a href="timeline-album.html">Album</a></li>
                                            <li><a href="timeline-friends.html">Friends</a></li>
                                        </ul>
                                        <ul className="follow-me list-inline">
                                            <li>1,299 people following her</li>
                                            <li><button className="btn-primary">Add Friend</button></li>
                                        </ul>
                                    </div>
                                </div>
                               
                            </div>{/*Timeline Menu for Large Screens End*/}
                            {/*Timeline Menu for Small Screens*/}
                            <div className="navbar-mobile hidden-lg hidden-md">
                                <div className="profile-info">
                                    <img src="images/users/avatar.jpg" alt="" className="img-responsive profile-photo" />
                                    <h4>Ngô Hải Yến</h4>
                                    <p className="text-muted">FourLeaf</p>
                                </div>
                                <div className="mobile-menu">
                                    <ul className="list-inline">
                                        <li><a href="timline.html" className="active">Timeline</a></li>
                                        <li><a href="timeline-about.html">About</a></li>
                                        <li><a href="timeline-album.html">Album</a></li>
                                        <li><a href="timeline-friends.html">Friends</a></li>
                                    </ul>
                                    <button className="btn-primary">Add Friend</button>
                                </div>
                            </div>{/*Timeline Menu for Small Screens End*/}
                        </div>
                        <Route exact path="/" component={TimelineDetail} />
                        <Route path="/about" component={TimelineAbout} />
                    </div>
                    </Router>
                </div>
                {/* Footer
    ================================================= */}
                <footer id="footer">
                    <div className="container">
                        <div className="row">
                            <div className="footer-wrapper">
                                <div className="col-md-3 col-sm-3">
                                    <a href="/"><img src="images/tc-black.png" alt="" className="footer-logo" /></a>
                                    <ul className="list-inline social-icons">
                                        <li><a href="/"><i className="icon ion-social-facebook" /></a></li>
                                        <li><a href="/"><i className="icon ion-social-twitter" /></a></li>
                                        <li><a href="/"><i className="icon ion-social-googleplus" /></a></li>
                                        <li><a href="/"><i className="icon ion-social-pinterest" /></a></li>
                                        <li><a href="/"><i className="icon ion-social-linkedin" /></a></li>
                                    </ul>
                                </div>
                                <div className="col-md-2 col-sm-2">
                                    <h5>For individuals</h5>
                                    <ul className="footer-links">
                                        <li><a href="/">Signup</a></li>
                                        <li><a href="/">login</a></li>
                                        <li><a href="/">Explore</a></li>
                                        <li><a href="/">Finder app</a></li>
                                        <li><a href="/">Features</a></li>
                                        <li><a href="/">Language settings</a></li>
                                    </ul>
                                </div>
                                <div className="col-md-2 col-sm-2">
                                    <h5>For businesses</h5>
                                    <ul className="footer-links">
                                        <li><a href="/">Business signup</a></li>
                                        <li><a href="/">Business login</a></li>
                                        <li><a href="/">Benefits</a></li>
                                        <li><a href="/">Resources</a></li>
                                        <li><a href="/">Advertise</a></li>
                                        <li><a href="/">Setup</a></li>
                                    </ul>
                                </div>
                                <div className="col-md-2 col-sm-2">
                                    <h5>About</h5>
                                    <ul className="footer-links">
                                        <li><a href="/">About us</a></li>
                                        <li><a href="/">Contact us</a></li>
                                        <li><a href="/">Privacy Policy</a></li>
                                        <li><a href="/">Terms</a></li>
                                        <li><a href="/">Help</a></li>
                                    </ul>
                                </div>
                                <div className="col-md-3 col-sm-3">
                                    <h5>Contact Us</h5>
                                    <ul className="contact">
                                        <li><i className="icon ion-ios-telephone-outline" />+84 326 326 736</li>
                                        <li><i className="icon ion-ios-email-outline" />phamphanminhtoan@gmail.com</li>
                                        <li><i className="icon ion-ios-location-outline" />227 Nguyen Van Cu, District 5, HCM city</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="copyright">
                        <p>Team chị Yến. All rights reserved</p>
                    </div>
                </footer>
            </div>

        );
    }
}

export default Timeline;
