import React from "react";

const Activities = props => {
  return (
    <div className="feed-item">
      <div className="live-activity">
        <p>
          <a href="/" className="profile-link">
            {props.user.fullname}
          </a>{" "}
         {props.activities.action}
        </p>
        <p className="text-muted">{props.activities.createTime}</p>
      </div>
    </div>
  );
};

export default Activities;
