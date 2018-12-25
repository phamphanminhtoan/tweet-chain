import React, { Fragment } from "react";
import TimelineCover from "../../components/TimelineCover";
import PostBox from "../../components/PostBox";
import "./style.css";
import PostContent from "../../components/PostContent";
import Activities from "../../components/Activites";
//Redux
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  fetchListPost,
  fetchListFollowings,
  fetchUser,
  fetchNotification,
  fetchPayment
} from "./action";
//Modal
import FollowingsComponent from "../../components/Followings";
import PaymentComponent from "../../components/Payment";
import { toastr } from "react-redux-toastr";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class Profile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      Open: "Timeline"
    };
  }
  openfollow = () => {
    this.setState({ Open: "Follow" });
    const user = JSON.parse(window.localStorage.getItem("User"));
    if (this.props.match.params.publicKey !== undefined) {
      this.props.fetchListFollowings(this.props.match.params.publicKey);
    }else{
      this.props.fetchListFollowings(user.publicKey);
    }
  };

  openPayment = () => {
    this.setState({ Open: "Payment" });
    const user = JSON.parse(window.localStorage.getItem("User"));
    if (this.props.match.params.publicKey !== undefined) {
      this.props.fetchPayment(this.props.match.params.publicKey);
    }else{
      this.props.fetchPayment(user.publicKey);
    }
  };

  OpenTimeline = () => {
    this.setState({ Open: "Timeline" });
    const user = JSON.parse(window.localStorage.getItem("User"));
    if (this.props.match.params.publicKey !== undefined) {
      this.props.fetchListPost(this.props.match.params.publicKey);
    }else{
      this.props.fetchListPost(user.publicKey);
    }
  };

  componentWillMount = async () => {
    let promise = [];
    if (this.props.match.params.publicKey !== undefined) {
      promise.push(this.props.fetchUser(this.props.match.params.publicKey));
      promise.push(this.props.fetchListPost(this.props.match.params.publicKey));
      promise.push(
        this.props.fetchNotification(this.props.match.params.publicKey)
      );
/*       promise.push(
        this.props.fetchListFollowings(this.props.match.params.publicKey)
      ); */
    /*   promise.push(
        this.props.fetchPayment(this.props.match.params.publicKey)
      ); */
    } else {
      const user = JSON.parse(window.localStorage.getItem("User"));
      promise.push(this.props.fetchUser(user.publicKey));
      promise.push(this.props.fetchListPost(user.publicKey));
      promise.push(this.props.fetchNotification(user.publicKey));
/*       promise.push(this.props.fetchListFollowings(user.publicKey));
      promise.push(this.props.fetchPayment(user.publicKey)); */
    }
    await Promise.all(promise);
  };

  render() {
    const { post, notification, followings, userProfile } = this.props;
    let ownerFlag = true;
    let ownerUser = JSON.parse(window.localStorage.getItem("User"));
    if (this.props.match) {
      ownerFlag = false;
    } else {
      ownerFlag = true;
    }
    return (
      <div className="timeline">
        <TimelineCover
          user={userProfile.user}
          handleOpenModal={this.openModal}
          countFollow={followings.listFollowings.length}
          follow={this.props.followings}
          openfollow={this.openfollow}
          OpenTimeline={this.OpenTimeline}
          openPayment={this.openPayment}
          Open={this.state.Open}
        />
        <div id="page-contents">
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-7">
              {this.state.Open === "Timeline" ? (
                <Fragment>
                  {ownerUser.publicKey === userProfile.user.publicKey ? (
                    <PostBox  />
                  ) : (
                    <div />
                  )}
                  {!post.isFetching ? ( !post.error ?  (
                    post.listPost.map((e, index) => (
                      <PostContent
                        user={userProfile.user}
                        post={e}
                        key={index}
                      />
                    ))): <p>Không có bài viết nào.</p>
                  ) : (
                    <center><div className="loader"></div></center>
                  )}
                </Fragment>
              ) : (
                <div />
              )}
              {this.state.Open === "Follow" ? 
                (<FollowingsComponent
                  followings={this.props.followings}
                />) 
               : (
                <div />
              )}
              {this.state.Open === "Payment" ? (
                <PaymentComponent payment={this.props.payment} />
              ) : (
                <div />
              )}
            </div>
            <div className="col-md-2 static">
              <div id="sticky-sidebar">
                <h4 className="grey">Activity</h4>
                {!notification.isFetching ? (!notification.error ? (
                  notification.listNotification.map((activities, index) => (
                    <Activities activities={activities} key={index} />
                  ))
                ): <p>Không có thông báo nào.</p>) : (
                  <div className="loader"></div>
                )}
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
    );
  }
}

const mapStateToProps = state => ({
  post: state.listPostState,
  followings: state.listFollowingsState,
  userProfile: state.userState,
  notification: state.listNotificationState,
  payment: state.listPaymentState
});

const mapDispatchToProps = dispatch => ({
  fetchListPost: publicKey => dispatch(fetchListPost(publicKey)),
  fetchListFollowings: publicKey => dispatch(fetchListFollowings(publicKey)),
  fetchUser: publicKey => dispatch(fetchUser(publicKey)),
  fetchNotification: publicKey => dispatch(fetchNotification(publicKey)),
  fetchPayment: publicKey => dispatch(fetchPayment(publicKey))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile)
);
