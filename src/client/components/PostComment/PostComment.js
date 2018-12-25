import React from "react";
import moment from 'moment';

const PostComment = props => {
  const  { comment } = props;
  return (
    <div className="post-comment">
      <img src={comment.user.picture ? comment.user.picture :  "https://www.lewesac.co.uk/wp-content/uploads/2017/12/default-avatar.jpg"} alt="" className="profile-photo-sm" />
      <p>
        <a href={"/profile/"+comment.user.publicKey} className="profile-link">
        {comment.user.name ? comment.user.name: "NoName"} {" : "}
        </a>
        {comment.text}<br/>
        {moment(comment.createTime.iso).fromNow()}
      </p>
    </div>
  );
};

export default PostComment;
