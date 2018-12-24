import React from "react";
import TimelineCover from "../../components/TimelineCover";
import PostBox from "../../components/PostBox";
import "./style.css";
import PostContent from "../../components/PostContent";
import Activities from "../../components/Activites";
//Redux
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchListPost, fetchListFollowings, fetchUser } from "./action";
//Modal
import Modal from "react-modal";
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

  componentDidMount = async ()=>{;
    if(this.props.match.params.publicKey !== undefined)
    {
      await this.props.fetchUser(this.props.match.params.publicKey);
      await this.props.fetchListPost(this.props.match.params.publicKey);
    }

    else
    {
      const user = JSON.parse(window.localStorage.getItem("User"));
      await this.props.fetchUser(user.publicKey);
      await this.props.fetchListPost(this.props.match.params.publicKey);
    }

  }
  render() {
    let ownerFlag = true;
    let user = this.props.user;
    if (this.props.match) {   
      ownerFlag = false;
    } else {    
      ownerFlag = true;
    }
    console.log(this.props.post);
    return (
      <div className="timeline">
        <TimelineCover user={user} handleOpenModal={this.openModal} />
        <div id="page-contents">
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-7">
              <PostBox user={user} />
              {this.props.post ? this.props.post.map((e,index)=>(
                  <PostContent user={user} post={e} key={index} />
              )): <div />}
            </div>
            <div className="col-md-2 static">
              <div id="sticky-sidebar">
                <h4 className="grey">Activity</h4>
{/*                 {tempActivities.map((activities, index) => (
                  <Activities
                    activities={activities}
                    user={tempData}
                    key={index}
                  />
                ))} */}
                <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2 ref={subtitle => (this.subtitle = subtitle)}>
                    List followings
                  </h2>
                  <hr />
                  <div>I am a modal</div>
                  <hr />
                  <button className="btn btn-danger" onClick={this.closeModal}>
                    close
                  </button>
                </Modal>
                <button
                  onClick={() => toastr.success("The title", "The message")}
                  type="button"
                >
                  Toastr Success
                </button>
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
  user: state.userState.user,
  isFetchingPost: state.listPostState.isFetching,
  isFetchingFollowings: state.listFollowingsState.isFetching,
  errorPost: state.listPostState.error,
  errorFollowings: state.listFollowingsState.error
});

const mapDispatchToProps = dispatch => ({
  fetchListPost: publicKey => dispatch(fetchListPost(publicKey)),
  fetchListFollowings: publicKey => dispatch(fetchListFollowings(publicKey)),
  fetchUser: publicKey => dispatch(fetchUser(publicKey))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile)
);
