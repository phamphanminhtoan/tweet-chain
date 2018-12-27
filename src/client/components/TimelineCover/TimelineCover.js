import React, { Fragment } from "react";
const { encodeUpdateFollowingsTransaction } = require('../../helpers/handle/update');
const { calculateEnergy } = require('../../helpers/energy/calculate');
import axios from 'axios';
import { toastr } from "react-redux-toastr";

class ProfileBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      energy: 0
     }
  }

  componentDidMount = ()=>{
    const user = JSON.parse(window.localStorage.getItem("User"));
    setInterval(async()=>{ 
        await this.setState({energy: calculateEnergy(user)});
     }, 3000);
  }

  handleFollow = async (key)=>{
    const user = JSON.parse(window.localStorage.getItem("User"));
    const privateKey = window.localStorage.getItem("PrivateKey");
    let listFollowing = user.followings ? user.followings : [];
    let isFollowing = listFollowing.indexOf(this.props.user.publicKey);
    let pos = listFollowing.indexOf(key);
    if(pos === -1)
    {
      listFollowing.push(key);
      console.log(listFollowing);
    let finalCode = encodeUpdateFollowingsTransaction(user.publicKey, privateKey, listFollowing, user.sequence+1);
/*     await axios.get('https://komodo.forest.network/broadcast_tx_commit?tx=' + finalCode)
    .then(response => {
      console.log(response);
      if( response.data.result.check_tx.code === 1 )
      toastr.error("Tweetchain", response.data.result.check_tx.log);
      else
      toastr.success("Tweetchain", "Success");
    })
    .catch(error => {
      toastr.error("Tweetchain", error.message);
      console.log(error);
    });   */
  }
    await this.props.getUpdateUser();
  }
  render() { 
    const user = JSON.parse(window.localStorage.getItem("User"));
    //Check if owner is following this account
    let listFollowing = user.followings ? user.followings : [];
    let isFollowing = listFollowing.indexOf(this.props.user.publicKey);
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
                      src={this.props.user.picture}
                      alt=""
                      className="img-responsive profile-photo"
                    />
                    <h3>{this.props.user.name}</h3>
                    <p className="text-muted">TweetChainer</p>
                    <div style={{border: "1px dashed black"}}>
                    <p className="text-muted">Sequence : <strong>{this.props.user.sequence}</strong></p>
                    <p className="text-muted">Balance : <strong>{this.props.user.balance}</strong></p>
                    <p className="text-muted">Energy : <strong>{this.state.energy}</strong></p>
                    </div>
                  </div>
                </div>
                <div className="col-md-9">
                  <ul className="list-inline profile-menu">
                    <li>
                      <a href="#" onClick={()=>{
                        this.props.openTimeline();
                      }} className={this.props.Open === "Timeline" ? "active": ""}>
                        TimeLine
                      </a>
                    </li>
                    <li>
                      <a href="#" className={this.props.Open === "Follow" ? "active": ""} onClick={()=>{
                        this.props.openfollow();
                      }}>Followings</a>
                    </li>
                    <li>
                      <a href="#" className={this.props.Open === "Payment" ? "active": ""} onClick={()=>{
                        this.props.openPayment();
                      }}>Payment</a>
                    </li>
                    <li>
                      {user.publicKey === this.props.user.publicKey ? (<a href="#" className={this.props.Open === "EditProfile" ? "active": ""} onClick={()=>{
                        this.props.openEditProfile();
                      }}>Profile</a>):null}
    
                      {user.publicKey === this.props.user.publicKey ? (<a href="#" className={this.props.Open === "Explore" ? "active": ""} onClick={()=>{
                        this.props.openExplore();
                      }}>Explore</a>):null}
                      
                    </li>
                  </ul>
                  <ul className="follow-me list-inline">
                    <li>{this.props.user.name} is following {this.props.countFollow} people</li>
                    <li>
                      {this.props.user.publicKey !== user.publicKey ?(isFollowing === -1 ? (<button className="btn-primary" onClick={()=>handleFollow(this.props.user.publicKey)} >Follow</button>):<button className="btn-primary" style={{backgroundColor:"red"}} onClick={()=>handleFollow(this.props.user.publicKey)} >Unfollow</button>) : <div/>}
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
                  src={this.props.user.picture}
                  alt=""
                  className="img-responsive profile-photo"
                />
                <h4>{this.props.user.name}</h4>
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
                    <a href="#" onClick={this.props.handleOpenModal}>Followings</a>
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
  }
}
 
export default ProfileBanner;

