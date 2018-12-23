import React from "react";
import TimelineCover from "../../components/TimelineCover";
import PostBox from "../../components/PostBox";
import "./style.css";
import PostContent from "../../components/PostContent";
import Activities from "../../components/Activites";
//Redux
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchListPost, fetchListFollowings } from "./action";
//Modal
import Modal from "react-modal";

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

const tempData = {
  fullName: "Ngô Hải Yến",
  address: "Hanoi City",
  followingPeople: "1,120",
  avatarUrl: "images/users/avatar.jpg",
  coverUrl: "../images/covers/cover.jpg"
};

const tempPostContent = {
  post: {
    image: "images/post-images/15.jpg",
    createTime: "10/22/2016",
    content: " Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    like: 123,
    dislike: 0,
    comments: [
      {
        avatarUrl: "images/users/user-4.jpg",
        username: "John",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing"
      },
      {
        avatarUrl: "images/users/user-11.jpg",
        username: " Diana",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing"
      }
    ],
    user: {
      fullName: "Ngô Hải Yến",
      address: "Hanoi City",
      followingPeople: "1,120",
      avatarUrl: "images/users/avatar.jpg",
      coverUrl: "../images/covers/cover.jpg"
    }
  }
};

const tempActivities = [
  {
    action: " Commended on a Photo",
    createTime: "4 hours ago"
  },
  {
    action: " Has posted a photo",
    createTime: "4 hours ago"
  },
  {
    action: " Liked her friend post",
    createTime: "4 hours ago"
  },
  {
    action: "has shared an album",
    createTime: "4 hours ago"
  }
];

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
  }
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  render() {
    return (
      <div className="timeline">
        <TimelineCover user={tempData} handleOpenModal={this.openModal} />
        <div id="page-contents">
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-7">
              <PostBox user={tempData} />
              <PostContent user={{}} post={tempPostContent} />
              <PostContent user={{}} post={tempPostContent} />
              <PostContent user={{}} post={tempPostContent} />
              <PostContent user={{}} post={tempPostContent} />
            </div>
            <div className="col-md-2 static">
              <div id="sticky-sidebar">
                <h4 className="grey">Activity</h4>
                {tempActivities.map((activities, index) => (
                  <Activities
                    activities={activities}
                    user={tempData}
                    key={index}
                  />
                ))}
                <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2 ref={subtitle => (this.subtitle = subtitle)}>List followings</h2>
                  <hr />
                  <div>I am a modal</div>
                  <hr />
                  <button className="btn btn-danger" onClick={this.closeModal}>close</button>
  
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.listPostState.listPost,
  followings: state.listFollowingsState.listFollowings,
  isFetchingPost: state.listPostState.isFetching,
  isFetchingFollowings: state.listFollowingsState.isFetching,
  errorPost: state.listPostState.error,
  errorFollowings: state.listFollowingsState.error
});

const mapDispatchToProps = dispatch => ({
  fetchListPost: publicKey => dispatch(fetchListPost(publicKey)),
  fetchListFollowings: publicKey => dispatch(fetchListFollowings(publicKey))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile)
);
