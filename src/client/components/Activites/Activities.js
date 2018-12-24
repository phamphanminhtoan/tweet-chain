import React from "react";
import moment from 'moment';

const Activities = props => {
  const user = props.activities.user;
  return (
    <div className="feed-item">
      <div className="live-activity">
        <p>
          <a href="/" className="profile-link">
          {user.name}
          </a>{" "}
          {props.activities.content}
         <br />
        </p>
        <p className="text-muted">{moment(props.activities.createTime.iso).fromNow()}</p>
      </div>
    </div>
  );
};

export default Activities;
/* const Activities = props => {
  console.log(props.activities);
  return (
    <div className="feed-item">
      <div className="live-activity">
        <p>
          <a href="/" className="profile-link">
            {props.activities.user.name}
          </a>{" "}
         {props.activities.content}
         <br />
         
        </p>
        <p className="text-muted">{props.activities.createTime}</p>
      </div>
    </div>
  );
};
 */