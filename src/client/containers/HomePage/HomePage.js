import React from "react";
import TimelineCover from "../../components/TimelineCover";
import PostBox from "../../components/PostBox";
import "./style.css";
import PostContent from "../../components/PostContent";
import Activities from "../../components/Activites";

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

const HomePage = props => {
  return (
    <div className="timeline">
      <TimelineCover user={tempData} />
      <div id="page-contents">
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-7">
            <PostBox user={tempData} />
            <PostContent post={tempPostContent} />
            <PostContent post={tempPostContent} />
            <PostContent post={tempPostContent} />
            <PostContent post={tempPostContent} />
          </div>
          <div className="col-md-2 static">
            <div id="sticky-sidebar">
              <h4 className="grey">Activity</h4>
              {tempActivities.map(activities => (
                <Activities activities={activities} user={tempData}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
